"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var Constants = __importStar(require("../constants"));
var fs = __importStar(require("fs-extra"));
var PathHelper = /** @class */ (function () {
    function PathHelper(context) {
        this.context = context;
    }
    PathHelper.prototype.getProjectPath = function () {
        return this.context.exeInfo.localEnvInfo.projectPath;
    };
    PathHelper.prototype.getAmplifyPath = function () {
        return path.join(this.getProjectPath(), Constants.AMPLIFY_FOLDER_NAME);
    };
    PathHelper.prototype.getBackEndPath = function () {
        return path.join(this.getAmplifyPath(), Constants.BACKEND_FOLDER_NAME);
    };
    PathHelper.prototype.getHostingPath = function () {
        return path.join(this.getBackEndPath(), Constants.CATAGORIE);
    };
    PathHelper.prototype.getAmplifyConsolePath = function () {
        return path.join(this.getHostingPath(), Constants.AMPLIFY_CONSOLE_FOLDER_NAME);
    };
    PathHelper.prototype.getCFNParameterPath = function () {
        return path.join(this.getAmplifyConsolePath(), Constants.CFN_PARAMETER_NAME);
    };
    PathHelper.prototype.getCFNTemplatePath = function () {
        return path.join(this.getAmplifyConsolePath(), Constants.CFN_TEMPLATE_NAME);
    };
    PathHelper.prototype.getTeamProviderPath = function () {
        return path.join(this.getAmplifyPath(), Constants.TEAM_PROVIDER_FILE_NAME);
    };
    PathHelper.prototype.getAmplifyMetaPath = function () {
        return path.join(this.getBackEndPath(), Constants.AMPLIFY_META_FILE_NAME);
    };
    PathHelper.prototype.getBackendFilePath = function () {
        return path.join(this.getBackEndPath(), Constants.BACKEND_CONFIG_FILE_NAME);
    };
    PathHelper.prototype.ensureAmplifyConsoleFolder = function () {
        fs.ensureDirSync(this.getAmplifyPath());
        fs.ensureDirSync(this.getBackEndPath());
        fs.ensureDirSync(this.getHostingPath());
        fs.ensureDirSync(this.getAmplifyConsolePath());
    };
    return PathHelper;
}());
exports.PathHelper = PathHelper;
//# sourceMappingURL=path-helper.js.map