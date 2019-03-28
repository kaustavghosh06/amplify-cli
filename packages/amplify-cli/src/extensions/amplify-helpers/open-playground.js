const pathManager = require('./path-manager');
const path = require('path');
const fs = require('fs-extra');

async function openPlayground(context) {


  let playGroundMeta = {
    amplifyMetaPath: pathManager.getAmplifyMetaFilePath(),
    schemaPath: `${pathManager.searchProjectRootPath()}/src/graphql/schema.json`,
    codeGenDir:  `${pathManager.searchProjectRootPath()}/src/graphql/`
  };

  console.log('Opening up playground');


  
    const targetDir = `${pathManager.getAmplifyDirPath()}/playground-app`;

    const sourceDir = `${__dirname}/../../lib/playground-app`;


    let copyAmplifyGeneratedFiles = () => {
      let amplifyGeneratedDir = `${targetDir}/src/amplify-generated`;

      fs.ensureDirSync(amplifyGeneratedDir);
      fs.copySync(pathManager.getAmplifyMetaFilePath(),`${amplifyGeneratedDir}/amplify-meta.json`);
      fs.copySync(`${pathManager.searchProjectRootPath()}/src/graphql/schema.json`,`${amplifyGeneratedDir}/schema.json`);
      fs.ensureDirSync(`${amplifyGeneratedDir}/graphql`);
      fs.copySync(`${pathManager.searchProjectRootPath()}/src/graphql/`,`${amplifyGeneratedDir}/graphql`);
    };


    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

    if(!fs.existsSync(targetDir)) {
      fs.ensureDirSync(targetDir);
      fs.copySync(sourceDir, targetDir);
      copyAmplifyGeneratedFiles();
      require('child_process').spawnSync(npm, ['install'], { cwd: targetDir, stdio: 'inherit' });

      require('child_process').spawnSync(npm, ['run', 'start'], { cwd: targetDir, stdio: 'inherit' });      


    } else {
      copyAmplifyGeneratedFiles();
      if(!fs.existsSync(`${targetDir}/node_modules`)) {
        require('child_process').spawnSync(npm, ['install'], { cwd: targetDir, stdio: 'inherit' });
      }
      require('child_process').spawnSync(npm, ['run', 'start'], { cwd: targetDir, stdio: 'inherit' });  

    }

}

module.exports = {
  openPlayground,
};
