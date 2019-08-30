import { Processor } from './processor-interface';
import { PathHelper, TemplateHelper, CommonHelper, AmplifyHelper, StackHelper, QuestionHelper } from '../helpers/index';
import { CFNParameters, AmplifyContext, CFNTemplate, App, HostingConfig, DeployType } from '../types';
import { Builder } from '../build/builder';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as Utils from '../utils/utils';
import { ConfigHelper } from '../helpers/config-helper';
import Table from 'cli-table2';
import ora from 'ora';
import chalk from 'chalk';
import open from 'open';

export class ManualProcessor implements Processor {
    private context: AmplifyContext;
    private templateHelper: TemplateHelper;
    private pathHelper: PathHelper;
    private stackHelper: StackHelper;
    private amplifyHelper: AmplifyHelper;
    private configHelper: ConfigHelper;
    private questionHelper: QuestionHelper;
    private commonHelper: CommonHelper;
    private builder: Builder;
    private currentBranch: string;
    private currentEnv: string;
    private stackName: string;
    private region: string;

    constructor(context: AmplifyContext) {
        this.context = context;
        this.currentEnv = this.context.exeInfo.localEnvInfo.envName;
        this.templateHelper = new TemplateHelper(context);
        this.pathHelper = new PathHelper(context);
        this.stackHelper = new StackHelper(context);
        this.amplifyHelper = new AmplifyHelper(context);
        this.configHelper = new ConfigHelper(context);
        this.questionHelper = new QuestionHelper(context);
        this.commonHelper = new CommonHelper(context);
        this.region = this.commonHelper.getRegion();
        this.builder = new Builder();
        this.pathHelper.ensureAmplifyConsoleFolder();
    }

    private async initTemplate(stackName: string): Promise<CFNTemplate> {
        let template: CFNTemplate = await this.templateHelper.generateTemplate(stackName);
        this.currentBranch = await this.questionHelper.askWhichBranchToUpdateQuestion(template);
        this.templateHelper.addBranchToTemplate(template, this.currentBranch);
        this.templateHelper.writeAppTemplate(template);
        this.configHelper.writeToAmplifyMeta('Manual');
        return template;
    }

    private async configureTemplate(template: CFNTemplate, appId: string): Promise<void> {
        let parameters: CFNParameters = await this.questionHelper.askAppConfigQuestion(template, appId);
        this.templateHelper.updateTemplate(template, parameters);
    }

    private async deployResource(template: CFNTemplate): Promise<void> {
        const stackName = await this.stackHelper.deployCFNStack(template, this.stackName);
        let hostConfig: HostingConfig = {
            amplifyconsole: {
                deployType: 'Manual',
                stackName
            }
        };
        await this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
    }

    private async publishResource(branchName: string, zipFilePath: string): Promise<void> {
        let outputs = await this.stackHelper.getStackOutputs(this.stackName);
        const defaultDomain = outputs.DefaultDomain;
        const app: App = { appId: outputs.AppId, branchName };
        await this.amplifyHelper.publishFileToAmplify(zipFilePath, app);
        fs.removeSync(zipFilePath);
        console.log('Amplify URL: ');
        console.log(` ${`${branchName}.${defaultDomain}`}`);
        console.log(`Run ${chalk.green('amplify hosting configure')} to setup custom domains, password protection, and redirects.`);
    }

    private async buildResource(doBuild: boolean): Promise<string> {
        const { projectConfig } = this.context.exeInfo;
        const frontendConfig = projectConfig[projectConfig.frontend].config;
        const projectPath = this.pathHelper.getProjectPath();
        const buildPath = path.join(projectPath, frontendConfig.DistributionDir);
        const buildCommand = projectConfig[projectConfig.frontend].config.BuildCommand;
        if (doBuild) {
            await this.builder.run(buildCommand, this.pathHelper.getProjectPath());
        }
        const zipFilePath = await Utils.zipFile(buildPath, projectPath);
        return zipFilePath;
    }

    private async publishCore(doBuild: boolean): Promise<void> {
        this.stackName = await this.configHelper.initStackName();
        let template = await this.initTemplate(this.stackName);
        const doDeploy = await this.questionHelper.askDeployNowQuestion(this.currentBranch);
        if (!doDeploy) {
            return;
        }
        const zipFilePath = await this.buildResource(doBuild);
        await this.deployResource(template);
        await this.publishResource(this.currentBranch, zipFilePath);
    }

    async publish(): Promise<void> {
        return this.publishCore(false);
    }

    async add(): Promise<void> {
        return this.publishCore(true);
    }

    async configure(): Promise<void> {
        this.stackName = await this.configHelper.initStackName();
        let outputs = await this.stackHelper.getStackOutputs(this.stackName);
        const appId = outputs.AppId;
        let template = await this.templateHelper.generateTemplate(this.stackName);
        await this.configureTemplate(template, appId);
        this.templateHelper.writeAppTemplate(template);
        const doDeploy = await this.questionHelper.askDeployNowQuestion();
        if (!doDeploy) {
            return;
        }
        await this.deployResource(template);
    }

    async status(): Promise<void> {
        this.stackName = await this.configHelper.initStackName();
        const appId = await this.getAppId(this.stackName);
        const branchMap = await this.amplifyHelper.generateBranchDomainMap(appId);
        let table = new Table({
            head: ['Frontend', 'Url']
        }) as Table.HorizontalTable;
        branchMap.forEach((value, key, map) => {
            value.forEach(domain => {
                table.push([key, domain]);
            });
        });
        console.log(`Amplify Console Frontend URL(s):`);
        console.log(table.toString());
    }

    async remove(stackName: string) {
        const spinner = ora();
        spinner.start('Deleting stack');
        await this.stackHelper.deleteCFNStack(stackName);
        spinner.succeed(`Completed clean cloud resources`);
        //delete info in teamprovider
        const localSpinner = ora();
        localSpinner.start();
        this.configHelper.deleteHostingForTeamConfig(this.currentEnv);
        this.configHelper.deleteAmplifyMeta();
        //delete folder
        fs.removeSync(this.pathHelper.getAmplifyConsolePath());
        localSpinner.succeed(`Completed clean local resources`);
    }

    async console() {
        this.stackName = await this.configHelper.initStackName();
        const appId = await this.getAppId(this.stackName);
        await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
    }

    private async getAppId(stackName: string): Promise<string> {
        let outputs = await this.stackHelper.getStackOutputs(this.stackName);
        return outputs.AppId;
    }
}