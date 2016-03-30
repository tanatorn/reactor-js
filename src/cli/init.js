import fse from 'fs-extra'
import path from 'path'
import Promise from 'bluebird'
import { createCustomIndex } from './helper'
import readline from 'readline'


const fs = Promise.promisifyAll(fse)

const rl = Promise.promisifyAll(readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}))

const question = Promise.promisify((q, callback) => {
  rl.question(q, callback.bind(null, null))
})


/**
 * Initializes Reactor
 */
const init = (args) => {
  if (args.length < 0 || args.length > 1) {
    console.log('You have entered an invalid number of arguments, please try again')
    return
  }
  const projectName = args[0]
  const configuration = {}
  console.log(`Creating ${projectName}...`)
  const targetDirectory = path.resolve(`${process.cwd()}/${projectName}/`)
  const templateDirectory = path.join(__dirname, '../../', 'site-template')
  question('What is the name of your website? \n')
    .then(websiteName => {
      configuration.name = websiteName
      return question('When the website is generated, would you like to remove the generated' +
      ' JavaScript bundle? (y/n) ')
    })
    .then(confirmation => {
      configuration.noJS = confirmation.toLowerCase() === 'y' ||
        confirmation.toLowerCase() === 'yes'
      rl.close()
      return fs.mkdirAsync(targetDirectory)
    })
    .then(() => fs.copyAsync(templateDirectory, targetDirectory))
    .then(() => createCustomIndex(configuration))
    .then(() => {
      const message =
      `Successfully created ${projectName}, to start developing,
      run 'cd ${projectName} && npm install'use reactor serve`
      console.log(message)
    })
    .catch(err => {
      if (err.code === 'EEXIST') {
        console.log('The directory you have chosen is not empty, please remove the folder or '
          + 'choose another directory')
      }
    })

}


export default init
