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
var inquirer = __importStar(require("inquirer"));
var index_1 = require("./index");
var chalk_1 = __importDefault(require("chalk"));
var open_1 = __importDefault(require("open"));
var log_symbols_1 = require("log-symbols");
var common_helper_1 = require("./common-helper");
var Utils = __importStar(require("../utils/index"));
var DEPLOY_TYPE_QUESTION = "Choose a " + chalk_1.default.red('type');
var DEPLOY_TYPE_QUESTION_MANUAL = 'Manual deployment';
var DEPLOY_TYPE_QUESTION_CICD = 'Continuous deployment (Git-based deployments)';
var SELECT_CONFIG_QUESTION = "Configure settings for all frontends:";
var SELECT_CONFIG_COMPLETION = "Apply configuration";
var SELECT_REMOVE_FRONTEND_QUESTION = "Select frontends to remove";
var BASIC_AUTH_USERNAME_QUESTION = "Enter username";
var BASIC_AUTH_PASSWORD_QUESTION = "Enter password";
var CONFIRM_QUESTION = "Confirm?";
var BASIC_AUTH_DISABLE_QUESTION = "Disable basic auth";
var BASIC_AUTH_EDIT_QUESTION = "Edit basic auth";
var CREATE_NEW_CUSTOM_RULE_QUESTIION = "Create new custom rule";
var DELETE_CUSTOM_RULE_QUESTION = "Delete custom rule";
var EDIT_CUSTOM_RULE_QUESTION = "Edit custom rule";
var EDIT_SOURCE_QUESTION = "Please input source url";
var EDIT_TARGET_QUESTION = "Please input target url";
var EDIT_STATUS_CODE = "Please input status code";
var EDIT_COUNTRY_CODE = "Please input contry code(enter to skip)";
var SELECT_DELETE_CUSTOM_RULE_QUESTION = "Please select custom rules to delete";
var SELECT_EIDT_CUSTOM_RULE_QUESTION = "Please select custom rules to edit";
var SELECT_CONFIG_AUTH = "Access control";
var SELECT_CONFIG_RULES = "Redirects and rewrites";
var SELECT_DOMAIN_MANAGEMENT = "Domain management";
var SELECT_REMOVE_FRONTEND = "Remove frontend environment";
var PICKUP_FRONTEND_QUESTION = "Pick a frontend environment to deploy to:";
var ADD_NEW_FRONTEND = 'create new';
var ADD_NEW_FRONTEND_QUESTION = "Enter a frontend environment name (e.g. dev or prod):";
var CICD_CONFIRM_QUESTION = "Continuous deployment is configued " + chalk_1.default.red('in') + " the browser.Once you complete the wizard please " + chalk_1.default.red('return') + " here and enter your branch URL. Continue:";
var INPUT_APP_ARN_QUESTION = "Please enter your Amplify Console App Arn (App Settings > General):";
var CHANGE_APP_ARN_QUESTION = "Please enter your new Amplify Console App Arn (App Settings > General):";
var QuestionHelper = /** @class */ (function () {
    function QuestionHelper(context) {
        this.templateHelper = new index_1.TemplateHelper(context);
        this.commonHelper = new common_helper_1.CommonHelper(context);
        this.region = this.commonHelper.getRegion();
    }
    QuestionHelper.prototype.askDeployType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer.prompt([
                            {
                                type: "list",
                                name: "anwser",
                                message: DEPLOY_TYPE_QUESTION,
                                choices: [
                                    DEPLOY_TYPE_QUESTION_MANUAL,
                                    DEPLOY_TYPE_QUESTION_CICD
                                ],
                                default: DEPLOY_TYPE_QUESTION_MANUAL
                            }
                        ])];
                    case 1:
                        anwser = (_a.sent()).anwser;
                        return [2 /*return*/, anwser === DEPLOY_TYPE_QUESTION_MANUAL ? 'Manual' : 'CICD'];
                }
            });
        });
    };
    QuestionHelper.prototype.askAppConfigQuestion = function (template, appId) {
        return __awaiter(this, void 0, void 0, function () {
            var selectConfigAuth, selectConfigRules, selectDomainManagement, selectRemoveFrontend, doesBasicAuthEdit, doesRulesEdit, doesDomainEdit, doesRemoveFrontEndEdit, parameters, branches, selectConfigKey, notComplete, questionList, selections, _a, result, result, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        selectConfigAuth = SELECT_CONFIG_AUTH;
                        selectConfigRules = SELECT_CONFIG_RULES;
                        selectDomainManagement = SELECT_DOMAIN_MANAGEMENT;
                        selectRemoveFrontend = SELECT_REMOVE_FRONTEND;
                        doesBasicAuthEdit = false;
                        doesRulesEdit = false;
                        doesDomainEdit = false;
                        doesRemoveFrontEndEdit = false;
                        parameters = this.templateHelper.getParametersFromTemplate(template);
                        branches = this.templateHelper.getBranchesFromTemplate(template);
                        selectConfigKey = 'selectConfig';
                        notComplete = true;
                        _c.label = 1;
                    case 1:
                        if (!notComplete) return [3 /*break*/, 14];
                        questionList = [
                            selectConfigAuth,
                            selectConfigRules,
                            selectDomainManagement,
                            SELECT_CONFIG_COMPLETION
                        ];
                        if (branches.length > 0) {
                            if (!questionList.includes(selectRemoveFrontend)) {
                                questionList.splice(questionList.length - 1, 0, selectRemoveFrontend);
                            }
                        }
                        else {
                            if (questionList.includes(selectRemoveFrontend)) {
                                questionList.splice(questionList.indexOf(selectRemoveFrontend));
                            }
                        }
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "list",
                                    name: selectConfigKey,
                                    message: SELECT_CONFIG_QUESTION,
                                    choices: questionList
                                }
                            ])];
                    case 2:
                        selections = _c.sent();
                        _a = selections[selectConfigKey];
                        switch (_a) {
                            case selectConfigAuth: return [3 /*break*/, 3];
                            case selectConfigRules: return [3 /*break*/, 5];
                            case selectRemoveFrontend: return [3 /*break*/, 7];
                            case selectDomainManagement: return [3 /*break*/, 9];
                            case SELECT_CONFIG_COMPLETION: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.askBaiscAuthQuestion({
                            configType: parameters.BasicAuthConfig, doesEdit: doesBasicAuthEdit
                        })];
                    case 4:
                        result = _c.sent();
                        parameters.BasicAuthConfig = result.configType;
                        doesBasicAuthEdit = result.doesEdit;
                        selectConfigAuth = editMessageWithSymbol(selectConfigAuth, doesBasicAuthEdit);
                        return [3 /*break*/, 13];
                    case 5: return [4 /*yield*/, this.askRedirectRewriteRuleQuestion({
                            configType: parameters.CustomRules,
                            doesEdit: doesRulesEdit
                        })];
                    case 6:
                        result = _c.sent();
                        parameters.CustomRules = result.configType;
                        doesRulesEdit = result.doesEdit;
                        selectConfigRules = editMessageWithSymbol(selectConfigRules, doesRulesEdit);
                        return [3 /*break*/, 13];
                    case 7:
                        _b = parameters;
                        return [4 /*yield*/, this.askWhichBranchesToDeleteQuestion(branches)];
                    case 8:
                        _b.BranchesToDelete = _c.sent();
                        if (parameters.BranchesToDelete.length > 0) {
                            doesRemoveFrontEndEdit = true;
                        }
                        branches = branches.filter(function (branch) { return !parameters.BranchesToDelete.includes(branch); });
                        selectRemoveFrontend = editMessageWithSymbol(selectRemoveFrontend, doesRemoveFrontEndEdit);
                        return [3 /*break*/, 13];
                    case 9: return [4 /*yield*/, open_1.default("https://" + this.region + ".console.aws.amazon.com/amplify/home?region=" + this.region + "#/" + appId + "/settings/domains")];
                    case 10:
                        _c.sent();
                        selectDomainManagement = editMessageWithSymbol(selectDomainManagement, true);
                        return [3 /*break*/, 13];
                    case 11:
                        {
                            notComplete = false;
                            return [3 /*break*/, 13];
                        }
                        _c.label = 12;
                    case 12: throw new Error('Unexpected config type');
                    case 13: return [3 /*break*/, 1];
                    case 14: return [2 /*return*/, parameters];
                }
            });
        });
    };
    QuestionHelper.prototype.askNewBasicAuthQuestion = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var userNameKey, passwordKey, confirmKey, basicAuthConfig, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userNameKey = 'userNameKey';
                        passwordKey = 'passwordKey';
                        confirmKey = 'confirmKey';
                        basicAuthConfig = question.configType;
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "input",
                                    name: userNameKey,
                                    message: BASIC_AUTH_USERNAME_QUESTION,
                                    default: basicAuthConfig ? basicAuthConfig.Username : undefined
                                },
                                {
                                    type: "password",
                                    name: passwordKey,
                                    message: BASIC_AUTH_PASSWORD_QUESTION
                                },
                                {
                                    type: "confirm",
                                    name: confirmKey,
                                    message: CONFIRM_QUESTION,
                                    default: true
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        if (anwser.confirmKey) {
                            return [2 /*return*/, {
                                    configType: {
                                        EnableBasicAuth: true,
                                        Username: anwser.userNameKey,
                                        Password: anwser.passwordKey,
                                    },
                                    doesEdit: true
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    configType: basicAuthConfig ? basicAuthConfig : undefined,
                                    doesEdit: question.doesEdit
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionHelper.prototype.askBaiscAuthQuestion = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var selectKey, basicAuthConfig, anwser, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selectKey = 'selectKey';
                        basicAuthConfig = question.configType;
                        if (!basicAuthConfig) return [3 /*break*/, 5];
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "list",
                                    name: selectKey,
                                    choices: [
                                        basicAuthConfig ? BASIC_AUTH_DISABLE_QUESTION : undefined,
                                        BASIC_AUTH_EDIT_QUESTION
                                    ]
                                }
                            ])];
                    case 1:
                        anwser = _b.sent();
                        if (!(anwser[selectKey] === BASIC_AUTH_EDIT_QUESTION)) return [3 /*break*/, 3];
                        _a = [{}];
                        return [4 /*yield*/, this.askNewBasicAuthQuestion(question)];
                    case 2: return [2 /*return*/, __assign.apply(void 0, _a.concat([_b.sent(), { doesEdit: true }]))];
                    case 3: return [2 /*return*/, {
                            doesEdit: true
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, this.askNewBasicAuthQuestion(question)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    QuestionHelper.prototype.askRedirectRewriteRuleQuestion = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var customRules, selectKey, anwser, option, _a, newRule, deletedRule, newRule;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        customRules = question.configType;
                        selectKey = 'selectKey';
                        if (!(customRules && customRules.length)) return [3 /*break*/, 11];
                        return [4 /*yield*/, inquirer.prompt([{
                                    type: "list",
                                    name: selectKey,
                                    choices: [
                                        CREATE_NEW_CUSTOM_RULE_QUESTIION,
                                        DELETE_CUSTOM_RULE_QUESTION,
                                        EDIT_CUSTOM_RULE_QUESTION
                                    ],
                                    default: CREATE_NEW_CUSTOM_RULE_QUESTIION
                                }])];
                    case 1:
                        anwser = _b.sent();
                        return [4 /*yield*/, anwser[selectKey]];
                    case 2:
                        option = _b.sent();
                        _a = option;
                        switch (_a) {
                            case CREATE_NEW_CUSTOM_RULE_QUESTIION: return [3 /*break*/, 3];
                            case DELETE_CUSTOM_RULE_QUESTION: return [3 /*break*/, 5];
                            case EDIT_CUSTOM_RULE_QUESTION: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, this.askNewCustomRuleQuestion()];
                    case 4:
                        newRule = _b.sent();
                        if (newRule) {
                            question.doesEdit = true;
                            customRules.push(newRule);
                        }
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, this.askDeleteCustomRuleQuestion(customRules)];
                    case 6:
                        deletedRule = _b.sent();
                        if (customRules.length === deletedRule.length) {
                            question.doesEdit = true;
                        }
                        customRules = deletedRule;
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.askEditCustomRuleQuestion(customRules)];
                    case 8:
                        customRules = _b.sent();
                        question.doesEdit = true;
                        return [3 /*break*/, 10];
                    case 9: throw new Error('Unexpected config type');
                    case 10: return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.askNewCustomRuleQuestion()];
                    case 12:
                        newRule = _b.sent();
                        customRules = [];
                        if (newRule) {
                            customRules.push(newRule);
                            question.doesEdit = true;
                        }
                        _b.label = 13;
                    case 13: return [2 /*return*/, __assign({}, question, { configType: customRules })];
                }
            });
        });
    };
    QuestionHelper.prototype.askNewCustomRuleQuestion = function (customRule) {
        return __awaiter(this, void 0, void 0, function () {
            var conditionKey, sourceKey, targetKey, statusKey, confirmKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conditionKey = 'conditionKey';
                        sourceKey = 'sourcekey';
                        targetKey = 'targetKey';
                        statusKey = 'status';
                        confirmKey = 'confirm';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: 'input',
                                    name: sourceKey,
                                    message: EDIT_SOURCE_QUESTION,
                                    default: customRule ? customRule.Source : undefined
                                },
                                {
                                    type: 'input',
                                    name: targetKey,
                                    message: EDIT_TARGET_QUESTION,
                                    default: customRule ? customRule.Target : undefined
                                },
                                {
                                    type: 'input',
                                    name: statusKey,
                                    message: EDIT_STATUS_CODE,
                                    default: customRule ? customRule.Status : 200
                                },
                                {
                                    type: 'input',
                                    name: conditionKey,
                                    message: EDIT_COUNTRY_CODE,
                                    default: customRule ? customRule.Condition : undefined
                                },
                                {
                                    type: 'confirm',
                                    name: confirmKey,
                                    message: CONFIRM_QUESTION,
                                    default: true
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        if (anwser[confirmKey]) {
                            return [2 /*return*/, {
                                    Source: anwser[sourceKey],
                                    Target: anwser[targetKey],
                                    Status: anwser[statusKey],
                                    Condition: anwser[conditionKey] ? conditionKey : undefined
                                }];
                        }
                        else {
                            return [2 /*return*/, customRule ? customRule : undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionHelper.prototype.askDeleteCustomRuleQuestion = function (customRules) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, displayList, customRuleMap, anwser, ruleToDelete, transFormedRules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'questionKey';
                        displayList = [];
                        customRuleMap = new Map();
                        customRules.forEach(function (customRule, index) {
                            var customRuleName = index + ":" + customRule.Source + "->" + customRule.Target + ":status:" + customRule.Status + ":contryCode:" + customRule.Condition;
                            displayList.push(customRuleName);
                            customRuleMap.set(customRuleName, customRule);
                        });
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "checkbox",
                                    name: questionKey,
                                    message: SELECT_DELETE_CUSTOM_RULE_QUESTION,
                                    choices: displayList
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        ruleToDelete = anwser[questionKey];
                        transFormedRules = ruleToDelete.map(function (ruleName) { return customRuleMap.get(ruleName); });
                        return [2 /*return*/, customRules.filter(function (customRule) { return !transFormedRules.includes(customRule); })];
                }
            });
        });
    };
    QuestionHelper.prototype.askEditCustomRuleQuestion = function (customRules) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, displayList, customRuleMap, anwser, ruleToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'questionKey';
                        displayList = [];
                        customRuleMap = new Map();
                        customRules.forEach(function (customRule, index) {
                            var customRuleName = index + ":" + customRule.Source + "->" + customRule.Target + ":status:" + customRule.Status + ":contryCode:" + customRule.Condition;
                            displayList.push(customRuleName);
                            customRuleMap.set(customRuleName, customRule);
                        });
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "list",
                                    name: questionKey,
                                    message: SELECT_EIDT_CUSTOM_RULE_QUESTION,
                                    choices: displayList
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        ruleToUpdate = customRuleMap.get(anwser[questionKey]);
                        return [4 /*yield*/, this.askNewCustomRuleQuestion(ruleToUpdate)];
                    case 2:
                        ruleToUpdate = _a.sent();
                        return [2 /*return*/, customRules];
                }
            });
        });
    };
    QuestionHelper.prototype.askUpdateInputQuestion = function (defaultValue, updateType) {
        return __awaiter(this, void 0, void 0, function () {
            var questionTemplate, updateKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionTemplate = "Input " + updateType;
                        updateKey = 'updateKey';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "input",
                                    name: updateKey,
                                    message: questionTemplate,
                                    default: defaultValue ? defaultValue : ''
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser.updateKey];
                }
            });
        });
    };
    QuestionHelper.prototype.askWhichBranchToUpdateQuestion = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, branchNames, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        branchNames = this.templateHelper.getBranchesFromTemplate(template);
                        if (!(branchNames.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "list",
                                    name: questionKey,
                                    message: PICKUP_FRONTEND_QUESTION,
                                    choices: branchNames.concat([ADD_NEW_FRONTEND])
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        if (anwser[questionKey] !== ADD_NEW_FRONTEND) {
                            return [2 /*return*/, anwser[questionKey]];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.askNewBranchName()];
                }
            });
        });
    };
    QuestionHelper.prototype.askNewBranchName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "input",
                                    name: questionKey,
                                    message: ADD_NEW_FRONTEND_QUESTION
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser[questionKey]];
                }
            });
        });
    };
    QuestionHelper.prototype.askDeployNowQuestion = function (envName) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "confirm",
                                    name: questionKey,
                                    message: getDeployNowQuestion(envName),
                                    default: true
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser[questionKey]];
                }
            });
        });
    };
    QuestionHelper.prototype.askAppIdQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "input",
                                    name: questionKey,
                                    message: INPUT_APP_ARN_QUESTION
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, Utils.getAppIdFromAppArn(anwser[questionKey])];
                }
            });
        });
    };
    QuestionHelper.prototype.askCICDConfirmQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "confirm",
                                    name: questionKey,
                                    message: CICD_CONFIRM_QUESTION,
                                    default: true
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser[questionKey]];
                }
            });
        });
    };
    QuestionHelper.prototype.askWhichBranchesToDeleteQuestion = function (branches) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "checkbox",
                                    name: questionKey,
                                    message: SELECT_REMOVE_FRONTEND_QUESTION,
                                    choices: branches
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser[questionKey]];
                }
            });
        });
    };
    QuestionHelper.prototype.askChangeAppIdQuestion = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var questionKey, anwser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionKey = 'question';
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: "input",
                                    name: questionKey,
                                    message: CHANGE_APP_ARN_QUESTION,
                                    choices: appId
                                }
                            ])];
                    case 1:
                        anwser = _a.sent();
                        return [2 /*return*/, anwser[questionKey]];
                }
            });
        });
    };
    return QuestionHelper;
}());
exports.QuestionHelper = QuestionHelper;
function getDeployNowQuestion(envName) {
    if (envName) {
        return "Your '" + chalk_1.default.green(envName) + "' frontend will be deployed to an amplifyapp.com domain. Deploy now?";
    }
    else {
        return "Deploy now?";
    }
}
function editMessageWithSymbol(input, doesEdit) {
    var doesMessageContainsSymbol = input.includes(log_symbols_1.success + ' ');
    var symbolString = log_symbols_1.success + ' ';
    if (doesMessageContainsSymbol) {
        if (!doesEdit) {
            return input.substring(symbolString.length);
        }
    }
    else {
        if (doesEdit) {
            return symbolString + input;
        }
    }
    return input;
}
//# sourceMappingURL=question-helper.js.map