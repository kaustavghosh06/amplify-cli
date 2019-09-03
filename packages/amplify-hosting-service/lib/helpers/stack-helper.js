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
var client_factory_1 = require("../clients/client-factory");
var ora_1 = __importDefault(require("ora"));
var CREATING_STACK_MESSAGE = 'Creating Amplify Console resources in the cloud.';
var CREATING_STACK_SUCCESS_MESSAGE = 'Creating Amplify Console resources complete!';
var UPDATING_STACK_MESSAGE = 'Updating Amplify Console resources in the cloud.';
var UPDATING_STACK_SUCCESS_MESSAGE = 'Updating Amplify Console resources complete!';
var StackHelper = /** @class */ (function () {
    function StackHelper(context) {
        this.context = context;
        this.clientFactory = new client_factory_1.ClientFactory(context);
    }
    StackHelper.prototype.deployCFNStack = function (template, stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, type, spinner, _a, waitForStatus, doUpdate_1, waitForStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _b.sent();
                        params = {
                            StackName: stackName,
                            TemplateBody: JSON.stringify(template, null, 4)
                        };
                        return [4 /*yield*/, this.doesStackExist(stackName)];
                    case 2:
                        type = (_b.sent()) ? 'Update' : 'Create';
                        spinner = ora_1.default();
                        _a = type;
                        switch (_a) {
                            case 'Create': return [3 /*break*/, 3];
                            case 'Update': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        spinner.start(CREATING_STACK_MESSAGE);
                        return [4 /*yield*/, this.cfnClient.createStack(params).promise()];
                    case 4:
                        _b.sent();
                        waitForStatus = 'stackCreateComplete';
                        return [4 /*yield*/, this.cfnClient.waitFor(waitForStatus, { StackName: stackName }).promise()];
                    case 5:
                        _b.sent();
                        spinner.succeed(CREATING_STACK_SUCCESS_MESSAGE);
                        return [2 /*return*/, stackName];
                    case 6:
                        doUpdate_1 = true;
                        spinner.start(UPDATING_STACK_MESSAGE);
                        return [4 /*yield*/, this.cfnClient.updateStack(params).promise().catch(function (err) {
                                if (err.code === 'ValidationError' && err.message.includes('No updates are to be performed')) {
                                    doUpdate_1 = false;
                                    spinner.succeed(UPDATING_STACK_MESSAGE);
                                }
                                else {
                                    throw err;
                                }
                            })];
                    case 7:
                        _b.sent();
                        if (!doUpdate_1) {
                            return [2 /*return*/, stackName];
                        }
                        waitForStatus = "stackUpdateComplete";
                        return [4 /*yield*/, this.cfnClient.waitFor(waitForStatus, { StackName: stackName }).promise()];
                    case 8:
                        _b.sent();
                        spinner.succeed(UPDATING_STACK_MESSAGE);
                        return [2 /*return*/, stackName];
                    case 9: throw new Error('Unexpected operation');
                }
            });
        });
    };
    StackHelper.prototype.deleteCFNStack = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var doDelete, params, waitForStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doDelete = true;
                        return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        params = {
                            StackName: stackName
                        };
                        return [4 /*yield*/, this.cfnClient.deleteStack(params).promise().catch(function (err) {
                                if (err.code === 'ValidationError') {
                                    _this.context.print.info('No stack detected. Skip cloud resource deletion');
                                    console.log(err.message);
                                    doDelete = false;
                                }
                                else {
                                    throw err;
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (!doDelete) {
                            return [2 /*return*/];
                        }
                        waitForStatus = "stackDeleteComplete";
                        return [4 /*yield*/, this.cfnClient.waitFor(waitForStatus, { StackName: stackName }).promise()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StackHelper.prototype.doesStackExist = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var doesStackExist, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doesStackExist = true;
                        return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        params = {
                            StackName: stackName
                        };
                        return [4 /*yield*/, this.cfnClient.describeStacks(params).promise().catch(function (err) {
                                if (err.code === 'ValidationError' && err.message.includes('does not exist')) {
                                    doesStackExist = false;
                                }
                                else {
                                    throw err;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, doesStackExist];
                }
            });
        });
    };
    StackHelper.prototype.initClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.cfnClient) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.clientFactory.getCFNClient()];
                    case 1:
                        _a.cfnClient = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    StackHelper.prototype.getStackOutputs = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        params = {
                            StackName: stackName
                        };
                        return [4 /*yield*/, this.cfnClient.describeStacks(params).promise()];
                    case 2:
                        data = _a.sent();
                        result = {};
                        data.Stacks[0].Outputs.forEach(function (output) {
                            result[output.OutputKey] = output.OutputValue;
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    StackHelper.prototype.getStackTemplate = function (stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        params = {
                            StackName: stackName
                        };
                        return [4 /*yield*/, this.cfnClient.getTemplate(params).promise().catch(function (err) {
                                if (err.code !== 'ValidationError' || !err.message.includes('does not exist')) {
                                    throw err;
                                }
                            })];
                    case 2:
                        data = _a.sent();
                        if (data) {
                            return [2 /*return*/, JSON.parse(data.TemplateBody)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return StackHelper;
}());
exports.StackHelper = StackHelper;
//# sourceMappingURL=stack-helper.js.map