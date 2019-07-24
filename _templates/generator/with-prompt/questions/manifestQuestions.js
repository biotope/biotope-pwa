// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

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
        default: '#00ff00',
        when: (answers) => answers.features.includes('Manifest')
    },
    {  
        type: 'input',
        name: 'backgroundColor',
        message: 'define a background color ',
        default: '#ff0000',
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