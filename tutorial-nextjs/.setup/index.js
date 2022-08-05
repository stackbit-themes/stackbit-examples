const { argv } = require('process');
const { exec } = require('child_process');
const config = require('./config');
const path = require('path');
const fs = require('fs');

const supportedSources = Object.keys(config);
const sourceName = argv[argv.length - 1];

const pagesDir = path.join(__dirname, '../pages');

const projectDir = path.join(__dirname, '..');
const templateDir = path.join(__dirname, `templates/source-${sourceName}`);

if (!supportedSources.includes(sourceName)) {
  console.error('[ERROR]: Please specify a source.');
  console.error('Usage: npm run setup [source]', '\n');
  console.error(`Supported sources: ${supportedSources.join(', ')}`);
  process.exit(1);
}

const { devDependencies, dependencies, setupCommand, templateFiles } = config[sourceName];

if (devDependencies && devDependencies.length) {
  console.log('Installing devDependencies ...');
  exec(`npm install --save-dev ${devDependencies.join(' ')}`);
}

if (dependencies && dependencies.length) {
  console.log('Installing dependencies ...');
  exec(`npm install ${dependencies.join(' ')}`);
}

if (setupCommand) {
  console.log('Running setup command ...');
  exec(setupCommand);
}

if (templateFiles && templateFiles.length) {
  console.log('Adding content source files ...');
  for (const file of templateFiles) {
    const srcPath = path.join(templateDir, file);
    const destPath = path.join(projectDir, file);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
}

console.log('Removing placeholder home page ...');
fs.rmSync(path.join(pagesDir, 'index.jsx'));
