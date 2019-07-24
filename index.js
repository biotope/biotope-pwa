const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path')
const defaultTemplates = path.join(__dirname, './_templates');
const webpush = require('web-push');
const chalk = require('chalk');
const inquirer = require('inquirer')


module.exports = async (feature) => {

  const vapidKeys = webpush.generateVAPIDKeys();  

  await runner(`generator with-prompt`, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    debug: !!process.env.DEBUG,
    createPrompter: () => require('inquirer'),
    helpers: {
      vapidKey: vapidKeys.publicKey
    }
  });

  if(feature == 'push') {
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

};
