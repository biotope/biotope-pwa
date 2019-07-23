// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'product name 🤓 '
    },
    {
        type: 'list',
        name: 'display',
        message: 'how should the application be displayed? ',
        default: 'browser',
        choices: ['browser', 'minimal-ui', 'fullscreen', 'standalone']
    },
    {
        type: 'list',
        name: 'orientation',
        message: 'Do you wish to enforce a specific orientation?',
        default: 'any',
        choices: ['any', 'portrait', 'landscape']
    },
    {  
        type: 'input',
        name: 'themeColor',
        message: 'define a theme color ',
        default: '#00ff00'
    },
    {  
        type: 'input',
        name: 'backgroundColor',
        message: 'define a background color ',
        default: '#ff0000'
    },
    {  
        type: 'input',
        name: 'iconSmall',
        message: 'define a 192x192 icon ',
        default: '/src/resources/img/icon-small.png'
    },
    {  
        type: 'input',
        name: 'iconLarge',
        message: 'define a 512x512 icon ',
        default: '/src/resources/img/icon-large.png'
    },
    {  
        type: 'input',
        name: 'startUrl',
        message: 'where to start the product when launched? ',
        default: '/index.html'
    },
    {
        type: 'input',
        name: 'directory',
        message: 'where to create the manifest file? ',
        default: 'src/resources'
    }
  ];
  
  const { camelize, dasherize, underscore } = require('inflection');
  
  module.exports = {
    prompt: ({ inquirer }) => {
      return inquirer
        .prompt(questions)
    },
  }