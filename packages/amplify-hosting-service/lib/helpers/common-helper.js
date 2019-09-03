"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonHelper = /** @class */ (function () {
    function CommonHelper(context) {
        this.context = context;
    }
    CommonHelper.prototype.getDefaultProjectName = function () {
        var projectPath = process.cwd();
        var projectConfigFilePath = this.context.amplify.pathManager.getProjectConfigFilePath(projectPath);
        return this.context.amplify.readJsonFile(projectConfigFilePath).projectName;
    };
    CommonHelper.prototype.generateUniqueStackName = function () {
        return this.getDefaultProjectName() + "-aws-amplify-console-" + (new Date()).getTime();
    };
    CommonHelper.prototype.getRegion = function () {
        return this.getProjectMeta().providers.awscloudformation.Region;
    };
    CommonHelper.prototype.getProjectMeta = function () {
        return this.context.amplify.getProjectMeta();
    };
    CommonHelper.prototype.getProjectConfig = function () {
        return this.context.amplify.getProjectConfig();
    };
    CommonHelper.prototype.getLocalEnvInfo = function () {
        return this.context.amplify.getEnvInfo();
    };
    return CommonHelper;
}());
exports.CommonHelper = CommonHelper;
//# sourceMappingURL=common-helper.js.map