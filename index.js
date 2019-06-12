const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path')
const defaultTemplates = path.join(__dirname, './_templates');

module.exports = (feature) => {
  if(!feature) {
    console.error('No feature defined');
    return;
  }

  runner(`${feature} with-prompt`, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    debug: !!process.env.DEBUG,
    createPrompter: () => require('inquirer'),
  });
};
