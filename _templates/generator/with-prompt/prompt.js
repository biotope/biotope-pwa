const { PathPrompt } = require('inquirer-path');
const manifestQuestions = require('./questions/manifestQuestions');
const serviceWorkerQuestions = require('./questions/serviceWorkerQuestions');
const vapidKeys = require('./vapidKeys');
const chalk = require('chalk');
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
    return new Promise((resolve, reject) => { 
      inquirer
      .prompt(questions).then((answers) => {
        if(answers.features.includes('Push Notifications')) {
          console.log(`
            ${chalk.yellow('=======================================')}
        
            The following keys are your application keys. Keep them and pass them on the the push service developer.
        
            ${chalk.yellow('=======================================')}
        
            Public Key:
            ${vapidKeys.publicKey}
        
            Private Key:
            ${vapidKeys.privateKey}
        
            ${chalk.yellow('=======================================')}
          `)
        }
        return resolve(answers)
      }).catch(reject)
    })
  },
}