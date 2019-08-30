import * as fs from 'fs-extra';
import archiver from 'archiver';
import * as path from 'path';
import ora from 'ora';

function zipFile(sourceDir: string, destDir: string): Promise<string> {
    return new Promise( (resolve, reject) => {
        const spinner = ora();
        if (!fs.pathExistsSync(sourceDir)) {
            reject('Please ensure your build path exist');
        }
        spinner.start('Zipping artifacts.. ');
        const now = new Date();
        const zipFilePath = path.join(destDir, `${now.getTime()}.zip`);
        let output = fs.createWriteStream(zipFilePath);
        let archive = archiver('zip');
        output.on('close', function () {
            spinner.succeed('Zipping artifacts completed');
            resolve(zipFilePath);
        });
        archive.on('error', function (err: archiver.ArchiverError) {
            spinner.fail('Zipping artifacts failed');
            reject(err);
        });
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}



function getAppIdFromAppArn(appArn: string): string {
    return appArn.split('/')[1];
}


export {
    zipFile,
    getAppIdFromAppArn
}