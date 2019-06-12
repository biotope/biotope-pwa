// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const questions = [
    {
        type: 'input',
        name: 'path',
        message: 'path to workers?',
        default: './'
    },
    {
        type: 'input',
        name: 'name',
        message: 'product name 🤓 '
    },
  ];
  
  const { camelize, dasherize, underscore } = require('inflection');
  
  module.exports = {
    prompt: ({ inquirer }) => {
      return inquirer
        .prompt(questions)
    },
  }