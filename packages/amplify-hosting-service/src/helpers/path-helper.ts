import * as path from 'path';
import { AmplifyContext } from '../types';
import * as Constants from '../constants';
import * as fs from 'fs-extra';

export class PathHelper {
    private context: AmplifyContext;
    constructor(context: AmplifyContext) {
        this.context = context;
    }

    getProjectPath(): string {
        return this.context.exeInfo.localEnvInfo.projectPath;
    }

    getAmplifyPath(): string {
        return path.join(this.getProjectPath(), Constants.AMPLIFY_FOLDER_NAME);
    }

    getBackEndPath(): string {
        return path.join(this.getAmplifyPath(), Constants.BACKEND_FOLDER_NAME);
    }

    getHostingPath(): string {
        return path.join(this.getBackEndPath(), Constants.CATAGORIE);
    }

    getAmplifyConsolePath(): string {
        return path.join(this.getHostingPath(), Constants.AMPLIFY_CONSOLE_FOLDER_NAME);
    }

    getCFNParameterPath(): string {
        return path.join(this.getAmplifyConsolePath(), Constants.CFN_PARAMETER_NAME);
    }

    getCFNTemplatePath(): string {
        return path.join(this.getAmplifyConsolePath(), Constants.CFN_TEMPLATE_NAME);
    }

    getTeamProviderPath(): string {
        return path.join(this.getAmplifyPath(), Constants.TEAM_PROVIDER_FILE_NAME);
    }

    getAmplifyMetaPath(): string {
        return path.join(this.getBackEndPath(), Constants.AMPLIFY_META_FILE_NAME);
    }

    getBackendFilePath(): string {
        return path.join(this.getBackEndPath(), Constants.BACKEND_CONFIG_FILE_NAME);
    }

    ensureAmplifyConsoleFolder(): void {
        fs.ensureDirSync(this.getAmplifyPath());
        fs.ensureDirSync(this.getBackEndPath());
        fs.ensureDirSync(this.getHostingPath());
        fs.ensureDirSync(this.getAmplifyConsolePath());
    }
}
