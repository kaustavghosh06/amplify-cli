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
var index_1 = require("./index");
var fs = __importStar(require("fs-extra"));
var template_json_1 = __importDefault(require("../templates/template.json"));
var branch_template_json_1 = __importDefault(require("../templates/branch-template.json"));
var constants_1 = require("../constants");
var TemplateHelper = /** @class */ (function () {
    function TemplateHelper(context) {
        this.context = context;
        this.pathHelper = new index_1.PathHelper(context);
        this.commonHelper = new index_1.CommonHelper(context);
        this.stackHelper = new index_1.StackHelper(context);
        this.templatePath = this.pathHelper.getCFNTemplatePath();
    }
    TemplateHelper.prototype.generateTemplate = function (stackName, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var template, cloudTemplate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = this.initTemplate();
                        return [4 /*yield*/, this.stackHelper.getStackTemplate(stackName)];
                    case 1:
                        cloudTemplate = _a.sent();
                        if (cloudTemplate) {
                            template.Resources = __assign({}, cloudTemplate.Resources, template.Resources);
                        }
                        if (parameters) {
                            this.updateTemplate(template, parameters);
                        }
                        return [2 /*return*/, template];
                }
            });
        });
    };
    TemplateHelper.prototype.getBranchesFromTemplate = function (template) {
        return Object.keys(template.Resources).filter(function (branchName) { return branchName !== constants_1.AMPLIFY_APP_LOGIC_ID; });
    };
    TemplateHelper.prototype.initTemplate = function () {
        if (fs.existsSync(this.templatePath)) {
            // load template
            return fs.readJSONSync(this.templatePath);
        }
        else {
            //generate new template
            var newTemplate = __assign({}, template_json_1.default);
            this.updateTemplate(newTemplate, {
                Name: this.commonHelper.getDefaultProjectName()
            });
            return newTemplate;
        }
    };
    TemplateHelper.prototype.doesTemplateExist = function () {
        return fs.existsSync(this.templatePath);
    };
    TemplateHelper.prototype.getParametersFromTemplate = function (template) {
        return __assign({}, template.Resources.AmplifyApp.Properties);
    };
    TemplateHelper.prototype.updateTemplate = function (template, parameters) {
        if (parameters.BranchesAfterEdit) {
            var branchesToChange = caculateBranchesToChange(parameters.Branches, parameters.BranchesAfterEdit);
            for (var _i = 0, _a = branchesToChange.branchesToDelete; _i < _a.length; _i++) {
                var branchToDelete = _a[_i];
                this.deleteBranchFromTemplate(template, branchToDelete);
            }
            for (var _b = 0, _c = branchesToChange.branchesToCreate; _b < _c.length; _b++) {
                var branchToCreate = _c[_b];
                this.addBranchToTemplate(template, branchToCreate);
            }
        }
        Object.keys(parameters).forEach(function (key) {
            if (parameters[key]) {
                if (key !== 'BranchesAfterEdit' && key !== 'Branches') {
                    template.Resources.AmplifyApp.Properties[key] = parameters[key];
                }
            }
        });
    };
    TemplateHelper.prototype.deleteBranchFromTemplate = function (template, branchName) {
        if (template.Resources[branchName]) {
            template.Resources[branchName] = undefined;
        }
    };
    TemplateHelper.prototype.addBranchToTemplate = function (template, branchName) {
        var branchTemplate;
        if (template.Resources[branchName]) {
            branchTemplate = template.Resources[branchName];
        }
        else {
            branch_template_json_1.default.Properties.BranchName = branchName;
            branchTemplate = branch_template_json_1.default;
        }
        template.Resources[branchName] = branchTemplate;
    };
    TemplateHelper.prototype.writeAppTemplate = function (template) {
        var appTemplate = __assign({}, template);
        appTemplate.Resources = {
            AmplifyApp: template.Resources.AmplifyApp
        };
        var jsonString = JSON.stringify(appTemplate, null, 4);
        fs.writeFileSync(this.templatePath, jsonString, 'utf8');
    };
    TemplateHelper.prototype.loadTemplate = function () {
        return this.context.amplify.readJsonFile(this.templatePath);
    };
    return TemplateHelper;
}());
exports.TemplateHelper = TemplateHelper;
function caculateBranchesToChange(currentBranches, branchesAfterEdit) {
    var branchesToChange = {
        branchesToCreate: [],
        branchesToDelete: []
    };
    for (var _i = 0, currentBranches_1 = currentBranches; _i < currentBranches_1.length; _i++) {
        var currentBranch = currentBranches_1[_i];
        if (!branchesAfterEdit.includes(currentBranch)) {
            branchesToChange.branchesToDelete.push(currentBranch);
        }
    }
    ;
    for (var _a = 0, branchesAfterEdit_1 = branchesAfterEdit; _a < branchesAfterEdit_1.length; _a++) {
        var branchAfterEdit = branchesAfterEdit_1[_a];
        if (!currentBranches.includes(branchAfterEdit)) {
            branchesToChange.branchesToCreate.push(branchAfterEdit);
        }
    }
    return branchesToChange;
}
//# sourceMappingURL=template-helper.js.map