const { PathPrompt } = require('inquirer-path');
const manifestQuestions = require('./questions/manifestQuestions');
const serviceWorkerQuestions = require('./questions/serviceWorkerQuestions');
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const questions = [
  {
    type: 'checkbox',
    name: 'features',
    message: 'Which features do you want in your worker?',
    validate: (features) => !!features.length,
    choices: [
      'Push Notifications',
      'Offline Caching',
      'Manifest'
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the name of your product? 🤓 ',
    when: (answers) => answers.features.length
  },
  ...manifestQuestions,
  ...serviceWorkerQuestions
];
  
module.exports = {
  prompt: ({ inquirer }) => {
    inquirer.prompt.registerPrompt('path', PathPrompt);
    return inquirer
      .prompt(questions)
  },
}