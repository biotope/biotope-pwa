const { PathPrompt } = require('inquirer-path');
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types

const questions = [
  {
    type: 'checkbox',
    name: 'features',
    message: 'Which features do you want in your worker?',
    choices: [
      'Push Notifications',
      'Offline Caching'
    ],
    validate: answer => answer.length > 0
  },
  {
    type: 'path',
    name: 'path',
    message: 'Where should we put the service worker? (Remember the scoping! )',
  },
  {
    type: 'input',
    name: 'name',
    message: "What's the name of your product?"
  },
  {
    type: 'path',
    name: 'icon',
    message: "Path to your app icon?",
    when: (answers) => answers.features.indexOf('Push Notifications') != -1
  },
];
  
module.exports = {
  prompt: ({ inquirer }) => {
    inquirer.prompt.registerPrompt('path', PathPrompt);
    return inquirer
      .prompt(questions)
  },
}