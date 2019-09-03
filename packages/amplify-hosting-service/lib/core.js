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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./processors/index");
var helpers_1 = require("./helpers");
var config_helper_1 = require("./helpers/config-helper");
var chalk_1 = __importDefault(require("chalk"));
var AmplifyConsole = /** @class */ (function () {
    function AmplifyConsole(context) {
        this.context = context;
        this.manualProcessor = new index_1.ManualProcessor(context);
        this.cicdProcessor = new index_1.CICDProcessor(context);
        this.questionHelper = new helpers_1.QuestionHelper(context);
        this.configHelper = new config_helper_1.ConfigHelper(context);
    }
    AmplifyConsole.prototype.add = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.questionHelper.askDeployType()];
                    case 1:
                        deployType = _b.sent();
                        _a = deployType;
                        switch (_a) {
                            case 'Manual': return [3 /*break*/, 2];
                            case 'CICD': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.manualProcessor.add()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.cicdProcessor.add()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        {
                            chalk_1.default.red('undefined operation');
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ;
    AmplifyConsole.prototype.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.configHelper.isHostingEanbled()) {
                            chalk_1.default.red('Please enable amplify console hosting first');
                            return [2 /*return*/];
                        }
                        deployType = this.configHelper.getDeployType();
                        _a = deployType;
                        switch (_a) {
                            case 'Manual': return [3 /*break*/, 1];
                            case 'CICD': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.manualProcessor.publish()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cicdProcessor.publish()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        {
                            chalk_1.default.red('undefined operation');
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyConsole.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.configHelper.isHostingEanbled()) {
                            chalk_1.default.red('Please enable amplify console hosting first');
                            return [2 /*return*/];
                        }
                        deployType = this.configHelper.getDeployType();
                        _a = deployType;
                        switch (_a) {
                            case 'Manual': return [3 /*break*/, 1];
                            case 'CICD': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.manualProcessor.status()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cicdProcessor.status()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        {
                            console.log('undefined operation');
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyConsole.prototype.configure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.configHelper.isHostingEanbled()) {
                            console.log('Please enable amplify console hosting first');
                            return [2 /*return*/];
                        }
                        deployType = this.configHelper.getDeployType();
                        _a = deployType;
                        switch (_a) {
                            case 'Manual': return [3 /*break*/, 1];
                            case 'CICD': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.manualProcessor.configure()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cicdProcessor.configure()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        {
                            chalk_1.default.red('undefined operation');
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyConsole.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var envName, stackName, appId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        envName = this.context.exeInfo.localEnvInfo.envName;
                        stackName = this.configHelper.loadStackNameByEnvFromTeamConfig(envName);
                        appId = this.configHelper.loadAppIdByEnvFromTeamConfig(envName);
                        if (!stackName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.manualProcessor.remove(stackName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!appId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cicdProcessor.remove(appId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('Can not detect your project settings');
                        chalk_1.default.red('Can not detect your project settings');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyConsole.prototype.console = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.configHelper.isHostingEanbled()) {
                            console.log('Please enable amplify console hosting first');
                            return [2 /*return*/];
                        }
                        deployType = this.configHelper.getDeployType();
                        _a = deployType;
                        switch (_a) {
                            case 'Manual': return [3 /*break*/, 1];
                            case 'CICD': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.manualProcessor.console()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.cicdProcessor.console()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        {
                            chalk_1.default.red('undefined operation');
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AmplifyConsole;
}());
exports.AmplifyConsole = AmplifyConsole;
//# sourceMappingURL=core.js.map