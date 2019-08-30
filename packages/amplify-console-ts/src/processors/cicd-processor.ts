import { Processor } from './processor-interface';
import { CommonHelper, QuestionHelper, AmplifyHelper, PathHelper } from '../helpers/index'
import { AmplifyContext, HostingConfig } from '../types';
import open from 'open';
import { ConfigHelper } from '../helpers/config-helper';
import Table from 'cli-table2';
import ora from 'ora';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export class CICDProcessor implements Processor {
    private context: AmplifyContext;
    private commonHelper: CommonHelper;
    private configHelper: ConfigHelper;
    private questionHelper: QuestionHelper;
    private amplifyHelper: AmplifyHelper;
    private pathHelper: PathHelper;
    private currentEnv: string;
    private region: string;
    private env: string;

    constructor(context: AmplifyContext) {
        this.context = context;
        this.commonHelper = new CommonHelper(context);
        this.configHelper = new ConfigHelper(context);
        this.questionHelper = new QuestionHelper(context);
        this.amplifyHelper = new AmplifyHelper(context);
        this.pathHelper = new PathHelper(context);
        this.region = this.commonHelper.getRegion();
        this.currentEnv = this.context.exeInfo.localEnvInfo.envName;
        this.env = this.context.exeInfo.localEnvInfo.envName;
    }

    async publish() {
        let appId = await this.configHelper.initAppId();
        if (appId) {
            await this.reuseApp(appId);
        } else {
            await this.createNewApp();
        }
    }

    async add() {
        await this.createNewApp();
    }

    private async createNewApp() {
        const doDeploy: boolean = await this.questionHelper.askCICDConfirmQuestion();
        if (!doDeploy) {
            return;
        }
        await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/create`);
        const appId = await this.questionHelper.askAppIdQuestion();
        let hostConfig: HostingConfig = {
            amplifyconsole: {
                deployType: 'CICD',
                appId
            }
        };
        this.configHelper.updateTeamConfig(this.env, hostConfig);
        this.configHelper.writeToAmplifyMeta('CICD');
    }

    private async reuseApp(appId: string) {
        await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
        let hostConfig: HostingConfig = {
            amplifyconsole: {
                deployType: 'CICD',
                appId
            }
        };
        this.configHelper.updateTeamConfig(this.env, hostConfig);
        this.configHelper.writeToAmplifyMeta('CICD');
    }

    async configure() {
        let appId = await this.configHelper.initAppId();
        if (!appId) {
            console.log(chalk.red('Please publish your app first'));
            return;
        }
        appId = await this.questionHelper.askChangeAppIdQuestion(appId);
        await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
        let hostConfig: HostingConfig = {
            amplifyconsole: {
                deployType: 'CICD',
                appId
            }
        };
        this.configHelper.updateTeamConfig(this.env, hostConfig);
        this.configHelper.writeToAmplifyMeta('CICD');
    }

    async status() {
        let appId = await this.configHelper.initAppId();
        if (!appId) {
            chalk.red('Please publish your app first');
            return;
        }
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

    async remove(appId: string) {
        const localSpinner = ora('Deleting local resources').start();
        this.configHelper.deleteHostingForTeamConfig(this.currentEnv);
        this.configHelper.deleteAmplifyMeta();
        //delete folder
        fs.removeSync(this.pathHelper.getAmplifyConsolePath());
        localSpinner.succeed(`Completed clean local resources`);
    }

    async console() {
        let appId = await this.configHelper.initAppId();
        if (appId) {
            await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
        } else {
            console.log(chalk.red('Please run amplify publish first'));
        }
    }
}