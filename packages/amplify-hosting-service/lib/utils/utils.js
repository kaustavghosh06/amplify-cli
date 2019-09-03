"use strict";
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
var fs = __importStar(require("fs-extra"));
var archiver_1 = __importDefault(require("archiver"));
var path = __importStar(require("path"));
var ora_1 = __importDefault(require("ora"));
function zipFile(sourceDir, destDir) {
    return new Promise(function (resolve, reject) {
        var spinner = ora_1.default();
        if (!fs.pathExistsSync(sourceDir)) {
            reject('Please ensure your build path exist');
        }
        spinner.start('Zipping artifacts.. ');
        var now = new Date();
        var zipFilePath = path.join(destDir, now.getTime() + ".zip");
        var output = fs.createWriteStream(zipFilePath);
        var archive = archiver_1.default('zip');
        output.on('close', function () {
            spinner.succeed('Zipping artifacts completed');
            resolve(zipFilePath);
        });
        archive.on('error', function (err) {
            spinner.fail('Zipping artifacts failed');
            reject(err);
        });
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}
exports.zipFile = zipFile;
function getAppIdFromAppArn(appArn) {
    return appArn.split('/')[1];
}
exports.getAppIdFromAppArn = getAppIdFromAppArn;
//# sourceMappingURL=utils.js.map