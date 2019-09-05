import { AmplifyContext, Amplify } from '../types';
import cfnProvider from 'amplify-provider-awscloudformation';
import AWS from 'aws-sdk';
export class ClientFactory {
    context: AmplifyContext;
    constructor(context: AmplifyContext) {
        this.context = context;
    }

    async getCFNClient(envName?: string): Promise<AWS.CloudFormation> {
        const aws = await this.getConfiguredSdk(envName);
        return new aws.CloudFormation();
    }

    async getAmplifyClient(): Promise<AWS.Amplify> {
        const aws = await this.getConfiguredSdk();
        return new aws.Amplify();
    }

    async getConfiguredSdk(envName?: string): Promise<any> {
        const awsSdk = await cfnProvider.getConfiguredAWSClient(this.context, envName);
        const awsItem = await awsSdk.configureWithCreds(this.context);
        return awsItem;
    }
}
