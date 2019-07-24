const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path')
const defaultTemplates = path.join(__dirname, './_templates');
const vapidKeys = require('./_templates/generator/with-prompt/vapidKeys')

module.exports = async (feature) => {

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

};
