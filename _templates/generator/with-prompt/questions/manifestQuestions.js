const fs = require('fs');
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const getColorOfSetting = (regexp) => {
    const pathToSettings = './src/resources/scss/settings/_settings.scss';
    if(fs.existsSync(pathToSettings)) {
        const content = fs.readFileSync(pathToSettings, 'utf-8');
        const match = content.match(regexp);
        if(match && match.length && match[1]) {
            return match[1].trim();
        }
    }
    return 'white';
}


 module.exports = [
    {
        type: 'list',
        name: 'display',
        message: 'how should the application be displayed? ',
        default: 'browser',
        choices: ['browser', 'minimal-ui', 'fullscreen', 'standalone'],
        when: (answers) => answers.features.includes('Manifest')
    },
    {
        type: 'list',
        name: 'orientation',
        message: 'Do you wish to enforce a specific orientation?',
        default: 'any',
        choices: ['any', 'portrait', 'landscape'],
        when: (answers) => answers.features.includes('Manifest')
    },
    {  
        type: 'input',
        name: 'themeColor',
        message: 'define a theme color ',
        default: getColorOfSetting(/\$primary:([^;]*)/),
        when: (answers) => answers.features.includes('Manifest')
    },
    {  
        type: 'input',
        name: 'backgroundColor',
        message: 'define a background color ',
        default: getColorOfSetting(/\$secondary:([^;]*)/),
        when: (answers) => answers.features.includes('Manifest')
    },
    {  
        type: 'input',
        name: 'icon',
        message: 'define a 192x192 icon ',
        default: '/src/resources/img/icon-small.png',
        when: (answers) => answers.features.includes('Manifest') || answers.features.includes('Push Notifications')
    },
    {  
        type: 'input',
        name: 'iconLarge',
        message: 'define a 512x512 icon ',
        default: '/src/resources/img/icon-large.png',
        when: (answers) => answers.features.includes('Manifest')
    },
    {  
        type: 'input',
        name: 'startUrl',
        message: 'Which page should be initially opened?',
        default: '/index.html',
        when: (answers) => answers.features.includes('Manifest')
    },
    {
        type: 'path',
        name: 'manifestPath',
        message: 'Where should we put the manifest.json?',
        when: (answers) => answers.features.includes('Manifest')
    }
  ];