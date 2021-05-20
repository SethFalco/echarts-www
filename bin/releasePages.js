const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

const spaPageConfigs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/spa-pages.json'), 'utf-8'));

async function run() {
    for (const pageCfg of spaPageConfigs) {
        const projectPath = path.resolve(__dirname, `../../${pageCfg.projectName}`);
        shell.cd(projectPath);
        shell.exec('npm run release');
        shell.cd(__dirname);
        shell.cp(
            '-R',
            `${projectPath}/dist`,
            path.resolve(__dirname, '_generated/spa', pageCfg.pageName)
        );
    }
}

run();