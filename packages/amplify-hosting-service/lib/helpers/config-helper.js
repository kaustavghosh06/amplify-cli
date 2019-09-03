"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var constants_1 = require("../constants");
var fs = __importStar(require("fs-extra"));
var ConfigHelper = /** @class */ (function () {
    function ConfigHelper(context) {
        this.context = context;
        this.pathHelper = new index_1.PathHelper(context);
        this.amplifyHelper = new index_1.AmplifyHelper(context);
        this.stackHelper = new index_1.StackHelper(context);
        this.commonHelper = new index_1.CommonHelper(context);
        this.teamProviderFilePath = this.pathHelper.getTeamProviderPath();
        this.amplifyMetaFilePath = this.pathHelper.getAmplifyMetaPath();
        this.backEndConfigFilePath = this.pathHelper.getBackendFilePath();
    }
    ConfigHelper.prototype.loadConfig = function (path) {
        return this.context.amplify.readJsonFile(path);
    };
    ConfigHelper.prototype.writeConfig = function (content, path) {
        var jsonString = JSON.stringify(content, null, 4);
        fs.writeFileSync(path, jsonString, 'utf8');
    };
    ConfigHelper.prototype.updateTeamConfig = function (env, hostConfig) {
        var content = this.loadConfig(this.teamProviderFilePath);
        if (!content[env].categories) {
            content[env].categories = { host: hostConfig };
        }
        else {
            content[env].categories.hosting = hostConfig;
        }
        this.writeConfig(content, this.teamProviderFilePath);
    };
    ConfigHelper.prototype.deleteHostingForTeamConfig = function (env) {
        var content = this.loadConfig(this.teamProviderFilePath);
        if (!content[env] || !content[env].categories) {
            return;
        }
        var categories = content[env].categories;
        if (categories.hosting
            && categories.hosting.amplifyconsole) {
            categories.hosting.amplifyconsole = undefined;
        }
        this.writeConfig(content, this.teamProviderFilePath);
    };
    ConfigHelper.prototype.getExistAppIdFromTeamConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, envs, _i, envs_1, envName, env, categories, appId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = this.loadConfig(this.teamProviderFilePath);
                        envs = Object.keys(content);
                        _i = 0, envs_1 = envs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < envs_1.length)) return [3 /*break*/, 4];
                        envName = envs_1[_i];
                        env = content[envName];
                        if (!env.categories) {
                            return [2 /*return*/, null];
                        }
                        categories = env.categories;
                        if (!(categories.hosting
                            && env.categories.hosting.amplifyconsole
                            && env.categories.hosting.amplifyconsole.appId)) return [3 /*break*/, 3];
                        appId = content[envName].categories.hosting.amplifyconsole.appId;
                        return [4 /*yield*/, this.amplifyHelper.doesAppExist(appId)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, appId];
                        }
                        ;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    ConfigHelper.prototype.getExistStackNameFromTeamConfig = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var envs, _i, envs_2, envName, env, categories, stackName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        envs = Object.keys(content);
                        _i = 0, envs_2 = envs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < envs_2.length)) return [3 /*break*/, 4];
                        envName = envs_2[_i];
                        env = content[envName];
                        if (!env.categories) return [3 /*break*/, 3];
                        categories = env.categories;
                        if (!(categories
                            && categories.hosting
                            && categories.hosting.amplifyconsole
                            && categories.hosting.amplifyconsole.stackName)) return [3 /*break*/, 3];
                        stackName = categories.hosting.amplifyconsole.stackName;
                        return [4 /*yield*/, this.stackHelper.doesStackExist(stackName)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, stackName];
                        }
                        ;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    ConfigHelper.prototype.initStackNameWithTeamConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, stackName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = this.loadConfig(this.teamProviderFilePath);
                        return [4 /*yield*/, this.getExistStackNameFromTeamConfig(content)];
                    case 1:
                        stackName = _a.sent();
                        return [2 /*return*/, stackName ? stackName : "" + this.commonHelper.generateUniqueStackName()];
                }
            });
        });
    };
    ConfigHelper.prototype.loadStackNameByEnvFromTeamConfig = function (envName) {
        var content = this.loadConfig(this.teamProviderFilePath);
        var env = content[envName];
        if (!env || !env.categories) {
            return null;
        }
        var categories = env.categories;
        if (categories.hosting
            && categories.hosting.amplifyconsole
            && categories.hosting.amplifyconsole.stackName) {
            return categories.hosting.amplifyconsole.stackName;
        }
        return null;
    };
    ConfigHelper.prototype.loadAppIdByEnvFromTeamConfig = function (envName) {
        var content = this.loadConfig(this.teamProviderFilePath);
        var env = content[envName];
        if (!env || !env.categories) {
            return null;
        }
        var categories = env.categories;
        if (categories.hosting
            && categories.hosting.amplifyconsole
            && categories.hosting.amplifyconsole.appId) {
            return categories.hosting.amplifyconsole.appId;
        }
        return null;
    };
    ConfigHelper.prototype.initStackName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var envName;
            return __generator(this, function (_a) {
                envName = this.commonHelper.getLocalEnvInfo().envName;
                if (this.loadStackNameByEnvFromTeamConfig(envName)) {
                    return [2 /*return*/, this.loadStackNameByEnvFromTeamConfig(envName)];
                }
                else {
                    return [2 /*return*/, this.initStackNameWithTeamConfig()];
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigHelper.prototype.initAppId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var envName;
            return __generator(this, function (_a) {
                envName = this.commonHelper.getLocalEnvInfo().envName;
                if (this.loadAppIdByEnvFromTeamConfig(envName)) {
                    return [2 /*return*/, this.loadAppIdByEnvFromTeamConfig(envName)];
                }
                else {
                    return [2 /*return*/, this.getExistAppIdFromTeamConfig()];
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigHelper.prototype.writeToAmplifyMeta = function (deployType) {
        this.context.amplify.updateamplifyMetaAfterResourceAdd(constants_1.CATAGORIE, constants_1.AMPLIFY_CONSOLE, {
            service: constants_1.AMPLIFY_CONSOLE,
            deployType: deployType
        });
    };
    ConfigHelper.prototype.deleteAmplifyMeta = function () {
        var metaContent = this.loadConfig(this.amplifyMetaFilePath);
        if (metaContent.hosting && metaContent.hosting.AmplifyConsole) {
            metaContent.hosting.AmplifyConsole = undefined;
        }
        var backEndContent = this.loadConfig(this.backEndConfigFilePath);
        if (backEndContent.hosting && backEndContent.hosting.AmplifyConsole) {
            backEndContent.hosting.AmplifyConsole = undefined;
        }
        this.writeConfig(metaContent, this.amplifyMetaFilePath);
        this.writeConfig(backEndContent, this.backEndConfigFilePath);
    };
    ConfigHelper.prototype.getDeployType = function () {
        var content = this.loadConfig(this.amplifyMetaFilePath);
        return content.hosting.AmplifyConsole.deployType;
    };
    ConfigHelper.prototype.isHostingEanbled = function () {
        var isValid = true;
        try {
            var content = this.loadConfig(this.amplifyMetaFilePath);
            if (!content.hosting.AmplifyConsole) {
                isValid = false;
            }
        }
        catch (_a) {
            isValid = false;
        }
        return isValid;
    };
    return ConfigHelper;
}());
exports.ConfigHelper = ConfigHelper;
//# sourceMappingURL=config-helper.js.map