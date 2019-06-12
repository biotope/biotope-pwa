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
        type: 'input',
        name: 'startUrl',
        message: 'where should the product start when launched? ',
        default: '/index.html'
    }
  ];
  
  const { camelize, dasherize, underscore } = require('inflection');
  
  module.exports = {
    prompt: ({ inquirer }) => {
      return inquirer
        .prompt(questions)
    },
  }