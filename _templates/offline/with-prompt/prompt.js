// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const questions = [
    {
        type: 'input',
        name: 'path',
        message: 'path to workers? !think on the scope 🦆',
        default: './'
    },
    {
        type: 'input',
        name: 'name',
        message: 'product name 🤓 '
    },
  ];
  
  module.exports = {
    prompt: ({ inquirer }) => {
      return inquirer
        .prompt(questions)
    },
  }