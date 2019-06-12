
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
  {
    type: 'input',
    name: 'path',
    message: "Where should we put the service worker",
    default: 'src/workers'
  },
  {
    type: 'input',
    name: 'icon',
    message: "What's the path to your icon?"
  },
  {
    type: 'input',
    name: 'title',
    message: "What's the title of your notifications?"
  }
]
