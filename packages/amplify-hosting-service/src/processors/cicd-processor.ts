import { Processor } from './processor-interface';
import { CommonHelper, QuestionHelper, AmplifyHelper, PathHelper, CleanHelper} from '../helpers/index'
import { AmplifyContext, HostingConfig } from '../types';
import open from 'open';
import { ConfigHelper } from '../helpers/config-helper';
import Table from 'cli-table2';
import ora from 'ora';
import * as fs from 'fs-extra';
import chalk from 'chalk';

const CONFIGURE_FIRST_MESSAGE = `Amplify Console app is not detected. Please run ${chalk.yellow('amplify hosting configure')} first`;

export class CICDProcessor implements Processor {
    private context: AmplifyContext;
    private commonHelper: CommonHelper;
    private configHelper: ConfigHelper;
    private questionHelper: QuestionHelper;
    private amplifyHelper: AmplifyHelper;
    private pathHelper: PathHelper;
    private cleanHelper: CleanHelper;
    private currentEnv: string;
    private region: string;

    constructor(context: AmplifyContext) {
        this.context = context;
        this.commonHelper = new CommonHelper(context);
        this.configHelper = new ConfigHelper(context);
        this.questionHelper = new QuestionHelper(context);
        this.amplifyHelper = new AmplifyHelper(context);
        this.pathHelper = new PathHelper(context);
        this.cleanHelper = new CleanHelper(context);
        this.region = this.commonHelper.getRegion();
        this.currentEnv = this.commonHelper.getLocalEnvInfo().envName;
    }

    async publish() {
        let appId = await this.configHelper.initAppId();
        if (appId) {
            await this.reuseApp(appId);
        } else {
            console.log(CONFIGURE_FIRST_MESSAGE);
        }
    }

    async add() {
        await this.createNewApp();
        this.configHelper.writeToAmplifyMeta('CICD');
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
        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
    }

    private async reuseApp(appId: string) {
        let hostConfig: HostingConfig = {
            amplifyconsole: {
                deployType: 'CICD',
                appId
            }
        };
        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
        if (await this.questionHelper.askViewAppQuestion()) {
            await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
        }
    }

    async configure() {
        let appId = await this.configHelper.initAppId();
        if (!appId) {
            await this.createNewApp();
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
        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
    }

    async status() {
        let appId = await this.configHelper.initAppId();
        if (!appId) {
            console.log(CONFIGURE_FIRST_MESSAGE);
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

    async remove() {
        await this.cleanHelper.clean();
    }

    async console() {
        let appId = await this.configHelper.initAppId();
        if (appId) {
            await open(`https://${this.region}.console.aws.amazon.com/amplify/home?region=${this.region}#/${appId}`);
        } else {
            console.log(CONFIGURE_FIRST_MESSAGE);
        }
    }
}