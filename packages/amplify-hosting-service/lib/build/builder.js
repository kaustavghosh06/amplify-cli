"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var chalk_1 = __importDefault(require("chalk"));
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.prototype.run = function (command, projectDirectory) {
        return new Promise(function (resolve, reject) {
            var args = command.split(/\s+/);
            var cmd = args[0];
            args = args.slice(1);
            var execution = child_process_1.spawn(cmd, args, { cwd: projectDirectory, env: process.env, stdio: 'inherit' });
            var rejectFlag = false;
            execution.on('exit', function (code) {
                if (code === 0) {
                    resolve();
                }
                else if (!rejectFlag) {
                    rejectFlag = true;
                    reject(code);
                }
            });
            execution.on('error', function (err) {
                console.log(chalk_1.default.red("command execution teminated with error"));
                if (!rejectFlag) {
                    rejectFlag = true;
                    reject(err);
                }
            });
        });
    };
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=builder.js.map