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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../helpers/index");
var open_1 = __importDefault(require("open"));
var config_helper_1 = require("../helpers/config-helper");
var cli_table2_1 = __importDefault(require("cli-table2"));
var ora_1 = __importDefault(require("ora"));
var fs = __importStar(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
var CICDProcessor = /** @class */ (function () {
    function CICDProcessor(context) {
        this.context = context;
        this.commonHelper = new index_1.CommonHelper(context);
        this.configHelper = new config_helper_1.ConfigHelper(context);
        this.questionHelper = new index_1.QuestionHelper(context);
        this.amplifyHelper = new index_1.AmplifyHelper(context);
        this.pathHelper = new index_1.PathHelper(context);
        this.region = this.commonHelper.getRegion();
        this.currentEnv = this.commonHelper.getLocalEnvInfo().envName;
    }
    CICDProcessor.prototype.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHelper.initAppId()];
                    case 1:
                        appId = _a.sent();
                        if (!appId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.reuseApp(appId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.createNewApp()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CICDProcessor.prototype.add = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createNewApp()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CICDProcessor.prototype.createNewApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doDeploy, appId, hostConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.questionHelper.askCICDConfirmQuestion()];
                    case 1:
                        doDeploy = _a.sent();
                        if (!doDeploy) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/create")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.questionHelper.askAppIdQuestion()];
                    case 3:
                        appId = _a.sent();
                        hostConfig = {
                            amplifyconsole: {
                                deployType: 'CICD',
                                appId: appId
                            }
                        };
                        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
                        this.configHelper.writeToAmplifyMeta('CICD');
                        return [2 /*return*/];
                }
            });
        });
    };
    CICDProcessor.prototype.reuseApp = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var hostConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/" + appId)];
                    case 1:
                        _a.sent();
                        hostConfig = {
                            amplifyconsole: {
                                deployType: 'CICD',
                                appId: appId
                            }
                        };
                        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
                        this.configHelper.writeToAmplifyMeta('CICD');
                        return [2 /*return*/];
                }
            });
        });
    };
    CICDProcessor.prototype.configure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appId, hostConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHelper.initAppId()];
                    case 1:
                        appId = _a.sent();
                        if (!appId) {
                            console.log(chalk_1.default.red('Please publish your app first'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.questionHelper.askChangeAppIdQuestion(appId)];
                    case 2:
                        appId = _a.sent();
                        return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/" + appId)];
                    case 3:
                        _a.sent();
                        hostConfig = {
                            amplifyconsole: {
                                deployType: 'CICD',
                                appId: appId
                            }
                        };
                        this.configHelper.updateTeamConfig(this.currentEnv, hostConfig);
                        this.configHelper.writeToAmplifyMeta('CICD');
                        return [2 /*return*/];
                }
            });
        });
    };
    CICDProcessor.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appId, branchMap, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHelper.initAppId()];
                    case 1:
                        appId = _a.sent();
                        if (!appId) {
                            chalk_1.default.red('Please publish your app first');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.amplifyHelper.generateBranchDomainMap(appId)];
                    case 2:
                        branchMap = _a.sent();
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
    CICDProcessor.prototype.remove = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var localSpinner;
            return __generator(this, function (_a) {
                localSpinner = ora_1.default('Deleting local resources').start();
                this.configHelper.deleteHostingForTeamConfig(this.currentEnv);
                this.configHelper.deleteAmplifyMeta();
                //delete folder
                fs.removeSync(this.pathHelper.getAmplifyConsolePath());
                localSpinner.succeed("Completed clean local resources");
                return [2 /*return*/];
            });
        });
    };
    CICDProcessor.prototype.console = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHelper.initAppId()];
                    case 1:
                        appId = _a.sent();
                        if (!appId) return [3 /*break*/, 3];
                        return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/" + appId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log(chalk_1.default.red('Please run amplify publish first'));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CICDProcessor;
}());
exports.CICDProcessor = CICDProcessor;
//# sourceMappingURL=cicd-processor.js.map