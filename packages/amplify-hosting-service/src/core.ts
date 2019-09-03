import { AmplifyContext, DeployType } from './types';
import { ManualProcessor, CICDProcessor } from './processors/index';
import { QuestionHelper, CommonHelper } from './helpers';
import { ConfigHelper } from './helpers/config-helper';
import chalk from 'chalk';

export class AmplifyConsole {
    private context: AmplifyContext;
    private questionHelper: QuestionHelper;
    private configHelper: ConfigHelper;
    private commonHelper: CommonHelper;
    private manualProcessor: ManualProcessor;
    private cicdProcessor: CICDProcessor;

    constructor(context: AmplifyContext) {
        this.context = context;
        this.manualProcessor = new ManualProcessor(context);
        this.cicdProcessor = new CICDProcessor(context);
        this.questionHelper = new QuestionHelper(context);
        this.configHelper = new ConfigHelper(context);
        this.commonHelper = new CommonHelper(context);
    }

    async add(): Promise<void> {
        if (this.configHelper.isHostingEanbled()) {
            console.log(chalk.red('You have already enabled AWS Amplify Console hosting!'));
            return;
        }
        const deployType: DeployType = await this.questionHelper.askDeployType();
        switch (deployType) {
            case 'Manual': {
                await this.manualProcessor.add();
                break;
            }
            case 'CICD': {
                await this.cicdProcessor.add();
                break;
            }
            default: {
                chalk.red('undefined operation');
            }
        }
    };

    async publish(): Promise<void> {
        if (!this.configHelper.isHostingEanbled()) {
            console.log(chalk.red('Please enable amplify console hosting first'));
            return;
        }
        const deployType: DeployType = this.configHelper.getDeployType();
        switch (deployType) {
            case 'Manual':
                await this.manualProcessor.publish();
                break;
            case 'CICD':
                await this.cicdProcessor.publish();
                break;
            default: {
                chalk.red('undefined operation');
            }
        }
    }

    async status(): Promise<void> {
        if (!this.configHelper.isHostingEanbled()) {
            console.log(chalk.red('Please enable amplify console hosting first'));
            return;
        }
        const deployType: DeployType = this.configHelper.getDeployType();
        switch (deployType) {
            case 'Manual':
                await this.manualProcessor.status();
                break;
            case 'CICD':
                await this.cicdProcessor.status();
                break;
            default: {
                console.log('undefined operation');
            }
        }
    }

    async configure(): Promise<void> {
        if (!this.configHelper.isHostingEanbled()) {
            console.log(chalk.red('Please enable amplify console hosting first'));
            return;
        }
        const deployType: DeployType = this.configHelper.getDeployType();
        switch (deployType) {
            case 'Manual':
                await this.manualProcessor.configure();
                break;
            case 'CICD':
                await this.cicdProcessor.configure();
                break;
            default: {
                chalk.red('undefined operation');
            }
        }
    }

    async remove(): Promise<void> {
        const { envName } = this.commonHelper.getLocalEnvInfo();
        const stackName = this.configHelper.loadStackNameByEnvFromTeamConfig(envName);
        const appId = this.configHelper.loadAppIdByEnvFromTeamConfig(envName);
        if (stackName) {
            await this.manualProcessor.remove(stackName);
        } else if (appId) {
            await this.cicdProcessor.remove(appId);
        } else {
            console.log(chalk.red('Can not detect your project settings'));
        }
    }

    async console(): Promise<void> {
        if (!this.configHelper.isHostingEanbled()) {
            console.log(chalk.red('Please enable amplify console hosting first'));
            return;
        }
        const deployType: DeployType = this.configHelper.getDeployType();
        switch (deployType) {
            case 'Manual':
                await this.manualProcessor.console();
                break;
            case 'CICD':
                await this.cicdProcessor.console();
                break;
            default: {
                chalk.red('undefined operation');
            }
        }
    }
}
