"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var client_factory_1 = require("../clients/client-factory");
var request_promise_1 = require("request-promise");
var fs = __importStar(require("fs-extra"));
var ora_1 = __importDefault(require("ora"));
var DEPLOY_ARTIFACTS_MESSAGE = "Deploying build artifacts to the Amplify Console..";
var DEPLOY_COMPLETE_MESSAGE = "Deployment complete!";
var AmplifyHelper = /** @class */ (function () {
    function AmplifyHelper(context) {
        this.context = context;
        this.clientFactory = new client_factory_1.ClientFactory(context);
    }
    AmplifyHelper.prototype.publishFileToAmplify = function (zipPath, app) {
        return __awaiter(this, void 0, void 0, function () {
            var spinner, jobParams, _a, zipUploadUrl, jobId, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _b.sent();
                        spinner = ora_1.default();
                        spinner.start(DEPLOY_ARTIFACTS_MESSAGE);
                        jobParams = app;
                        return [4 /*yield*/, this.cancelAllPendingJob(app)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.amplifyClient.createDeployment(app).promise()];
                    case 3:
                        _a = _b.sent(), zipUploadUrl = _a.zipUploadUrl, jobId = _a.jobId;
                        return [4 /*yield*/, this.httpPutFile(zipPath, zipUploadUrl)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.amplifyClient.startDeployment(__assign({}, jobParams, { jobId: jobId })).promise()];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, this.waitJobToSucceed({ appId: app.appId, branchName: app.branchName, jobId: jobId })];
                    case 6:
                        _b.sent();
                        spinner.succeed(DEPLOY_COMPLETE_MESSAGE);
                        return [2 /*return*/];
                }
            });
        });
    };
    AmplifyHelper.prototype.doesAppExist = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var doExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        doExist = true;
                        return [4 /*yield*/, this.amplifyClient.getApp({ appId: appId }).promise().catch(function (err) {
                                if (err.code === 'NotFoundException') {
                                    doExist = false;
                                }
                                else {
                                    throw err;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, doExist];
                }
            });
        });
    };
    AmplifyHelper.prototype.generateBranchDomainMap = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var branchMap, appResult, defaultDomain, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchMap = new Map();
                        return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.amplifyClient.getApp({ appId: appId }).promise()];
                    case 2:
                        appResult = _a.sent();
                        defaultDomain = appResult.app.defaultDomain;
                        return [4 /*yield*/, this.amplifyClient.listDomainAssociations({
                                appId: appId
                            }).promise()];
                    case 3:
                        response = _a.sent();
                        response.domainAssociations.forEach(function (domainAssociation) {
                            if (domainAssociation.domainStatus !== 'AVAILABLE') {
                                return;
                            }
                            var domainName = domainAssociation.domainName;
                            domainAssociation.subDomains.forEach(function (subDomain) {
                                var _a = subDomain.subDomainSetting, branchName = _a.branchName, prefix = _a.prefix;
                                if (!branchMap.get(branchName)) {
                                    branchMap.set(branchName, [prefix + "." + domainName]);
                                }
                                else {
                                    branchMap.set(branchName, branchMap.get(branchName).concat([prefix + "." + domainName]));
                                }
                            });
                        });
                        return [4 /*yield*/, this.amplifyClient.listBranches({ appId: appId }).promise()];
                    case 4:
                        result = _a.sent();
                        result.branches.forEach(function (branch) {
                            var branchName = branch.branchName;
                            if (branchMap.get(branchName)) {
                                branchMap.set(branchName, branchMap.get(branchName).concat([branchName + "." + defaultDomain]));
                            }
                            else {
                                branchMap.set(branchName, [branchName + "." + defaultDomain]);
                            }
                        });
                        return [2 /*return*/, branchMap];
                }
            });
        });
    };
    AmplifyHelper.prototype.removeBranch = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.amplifyClient.deleteBranch(app).promise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AmplifyHelper.prototype.getBranchNames = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.amplifyClient.listBranches({ appId: appId }).promise()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.branches.map(function (branch) { return branch.branchName; })];
                }
            });
        });
    };
    AmplifyHelper.prototype.cancelAllPendingJob = function (appInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var jobSummaries, _i, jobSummaries_1, jobSummary, jobId, status_1, job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.amplifyClient.listJobs(appInfo).promise()];
                    case 2:
                        jobSummaries = (_a.sent()).jobSummaries;
                        _i = 0, jobSummaries_1 = jobSummaries;
                        _a.label = 3;
                    case 3:
                        if (!(_i < jobSummaries_1.length)) return [3 /*break*/, 6];
                        jobSummary = jobSummaries_1[_i];
                        jobId = jobSummary.jobId, status_1 = jobSummary.status;
                        if (!(status_1 === 'PENDING' || status_1 === 'RUNNING')) return [3 /*break*/, 5];
                        job = __assign({}, appInfo, { jobId: jobId });
                        return [4 /*yield*/, this.amplifyClient.stopJob(job).promise()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyHelper.prototype.waitJobToSucceed = function (job) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var timeout, getJobResult, jobSummary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initClient()];
                    case 1:
                        _a.sent();
                        timeout = setTimeout(function () {
                            console.log('Job Timeout before succeeded');
                            reject();
                        }, 1000 * 60 * 10);
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.amplifyClient.getJob(job).promise()];
                    case 3:
                        getJobResult = _a.sent();
                        jobSummary = getJobResult.job.summary;
                        if (jobSummary.status === 'FAILED') {
                            console.log('Job failed.' + JSON.stringify(jobSummary));
                            clearTimeout(timeout);
                            resolve();
                            return [2 /*return*/];
                        }
                        if (jobSummary.status === 'SUCCEED') {
                            clearTimeout(timeout);
                            resolve();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.sleep(1000 * 3)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AmplifyHelper.prototype.initClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.amplifyClient) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.clientFactory.getAmplifyClient()];
                    case 1:
                        _a.amplifyClient = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AmplifyHelper.prototype.sleep = function (ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    };
    AmplifyHelper.prototype.httpPutFile = function (filePath, url) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_promise_1.put({
                            body: fs.readFileSync(filePath),
                            url: url
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AmplifyHelper;
}());
exports.AmplifyHelper = AmplifyHelper;
//# sourceMappingURL=amplify-helper.js.map