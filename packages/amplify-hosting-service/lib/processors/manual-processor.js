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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../helpers/index");
var builder_1 = require("../build/builder");
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var Utils = __importStar(require("../utils/utils"));
var config_helper_1 = require("../helpers/config-helper");
var cli_table2_1 = __importDefault(require("cli-table2"));
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var open_1 = __importDefault(require("open"));
var ManualProcessor = /** @class */ (function () {
    function ManualProcessor(context) {
        this.context = context;
        this.currentEnv = this.context.exeInfo.localEnvInfo.envName;
        this.templateHelper = new index_1.TemplateHelper(context);
        this.pathHelper = new index_1.PathHelper(context);
        this.stackHelper = new index_1.StackHelper(context);
        this.amplifyHelper = new index_1.AmplifyHelper(context);
        this.configHelper = new config_helper_1.ConfigHelper(context);
        this.questionHelper = new index_1.QuestionHelper(context);
        this.commonHelper = new index_1.CommonHelper(context);
        this.region = this.commonHelper.getRegion();
        this.builder = new builder_1.Builder();
        this.pathHelper.ensureAmplifyConsoleFolder();
    }
    ManualProcessor.prototype.initTemplate = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var template, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.templateHelper.generateTemplate(stackName)];
                    case 1:
                        template = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.questionHelper.askWhichBranchToUpdateQuestion(template)];
                    case 2:
                        _a.currentBranch = _b.sent();
                        this.templateHelper.addBranchToTemplate(template, this.currentBranch);
                        this.templateHelper.writeAppTemplate(template);
                        this.configHelper.writeToAmplifyMeta('Manual');
                        return [2 /*return*/, template];
                }
            });
        });
    };
    ManualProcessor.prototype.configureTemplate = function (template, appId) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.questionHelper.askAppConfigQuestion(template, appId)];
                    case 1:
                        parameters = _a.sent();
                        this.templateHelper.updateTemplate(template, parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.deployResource = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var stackName, hostConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stackHelper.deployCFNStack(template, this.stackName)];
                    case 1:
                        stackName = _a.sent();
                        hostConfig = {
                            amplifyconsole: {
                                deployType: 'Manual',
                                stackName: stackName
                            }
                        };
                        return [4 /*yield*/, this.configHelper.updateTeamConfig(this.currentEnv, hostConfig)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.publishResource = function (branchName, zipFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var outputs, defaultDomain, app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stackHelper.getStackOutputs(this.stackName)];
                    case 1:
                        outputs = _a.sent();
                        defaultDomain = outputs.DefaultDomain;
                        app = { appId: outputs.AppId, branchName: branchName };
                        return [4 /*yield*/, this.amplifyHelper.publishFileToAmplify(zipFilePath, app)];
                    case 2:
                        _a.sent();
                        fs.removeSync(zipFilePath);
                        console.log('Amplify URL: ');
                        console.log(" " + (branchName + "." + defaultDomain));
                        console.log("Run " + chalk_1.default.green('amplify hosting configure') + " to setup custom domains, password protection, and redirects.");
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.buildResource = function (doBuild) {
        return __awaiter(this, void 0, void 0, function () {
            var projectConfig, frontendConfig, projectPath, buildPath, buildCommand, zipFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectConfig = this.context.exeInfo.projectConfig;
                        frontendConfig = projectConfig[projectConfig.frontend].config;
                        projectPath = this.pathHelper.getProjectPath();
                        buildPath = path.join(projectPath, frontendConfig.DistributionDir);
                        buildCommand = projectConfig[projectConfig.frontend].config.BuildCommand;
                        if (!doBuild) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.builder.run(buildCommand, this.pathHelper.getProjectPath())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Utils.zipFile(buildPath, projectPath)];
                    case 3:
                        zipFilePath = _a.sent();
                        return [2 /*return*/, zipFilePath];
                }
            });
        });
    };
    ManualProcessor.prototype.publishCore = function (doBuild) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, template, doDeploy, zipFilePath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.configHelper.initStackName()];
                    case 1:
                        _a.stackName = _b.sent();
                        return [4 /*yield*/, this.initTemplate(this.stackName)];
                    case 2:
                        template = _b.sent();
                        return [4 /*yield*/, this.questionHelper.askDeployNowQuestion(this.currentBranch)];
                    case 3:
                        doDeploy = _b.sent();
                        if (!doDeploy) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.buildResource(doBuild)];
                    case 4:
                        zipFilePath = _b.sent();
                        return [4 /*yield*/, this.deployResource(template)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.publishResource(this.currentBranch, zipFilePath)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publishCore(false)];
            });
        });
    };
    ManualProcessor.prototype.add = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publishCore(true)];
            });
        });
    };
    ManualProcessor.prototype.configure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, outputs, appId, template, doDeploy;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.configHelper.initStackName()];
                    case 1:
                        _a.stackName = _b.sent();
                        return [4 /*yield*/, this.stackHelper.getStackOutputs(this.stackName)];
                    case 2:
                        outputs = _b.sent();
                        appId = outputs.AppId;
                        return [4 /*yield*/, this.templateHelper.generateTemplate(this.stackName)];
                    case 3:
                        template = _b.sent();
                        return [4 /*yield*/, this.configureTemplate(template, appId)];
                    case 4:
                        _b.sent();
                        this.templateHelper.writeAppTemplate(template);
                        return [4 /*yield*/, this.questionHelper.askDeployNowQuestion()];
                    case 5:
                        doDeploy = _b.sent();
                        if (!doDeploy) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.deployResource(template)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appId, branchMap, table;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.configHelper.initStackName()];
                    case 1:
                        _a.stackName = _b.sent();
                        return [4 /*yield*/, this.getAppId(this.stackName)];
                    case 2:
                        appId = _b.sent();
                        return [4 /*yield*/, this.amplifyHelper.generateBranchDomainMap(appId)];
                    case 3:
                        branchMap = _b.sent();
                        table = new cli_table2_1.default({
                            head: ['Frontend', 'Url']
                        });
                        branchMap.forEach(function (value, key, map) {
                            value.forEach(function (domain) {
                                table.push([key, domain]);
                            });
                        });
                        console.log("Amplify Console Frontend URL(s):");
                        console.log(table.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.remove = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var spinner, localSpinner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spinner = ora_1.default();
                        spinner.start('Deleting stack');
                        return [4 /*yield*/, this.stackHelper.deleteCFNStack(stackName)];
                    case 1:
                        _a.sent();
                        spinner.succeed("Completed clean cloud resources");
                        localSpinner = ora_1.default();
                        localSpinner.start();
                        this.configHelper.deleteHostingForTeamConfig(this.currentEnv);
                        this.configHelper.deleteAmplifyMeta();
                        //delete folder
                        fs.removeSync(this.pathHelper.getAmplifyConsolePath());
                        localSpinner.succeed("Completed clean local resources");
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.console = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.configHelper.initStackName()];
                    case 1:
                        _a.stackName = _b.sent();
                        return [4 /*yield*/, this.getAppId(this.stackName)];
                    case 2:
                        appId = _b.sent();
                        return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/" + appId)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualProcessor.prototype.getAppId = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var outputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stackHelper.getStackOutputs(this.stackName)];
                    case 1:
                        outputs = _a.sent();
                        return [2 /*return*/, outputs.AppId];
                }
            });
        });
    };
    return ManualProcessor;
}());
exports.ManualProcessor = ManualProcessor;
//# sourceMappingURL=manual-processor.js.map