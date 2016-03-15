import fse from 'fs-extra'
import path from 'path'
import Promise from 'bluebird'


const fs = Promise.promisifyAll(fse)

/**
 * Initializes Reactor
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
const init = (args) => {
  if (args.length < 0 || args.length > 1) {
    console.log('You have entered an invalid number of arguments, please try again')
    return
  }
  const projectName = args[0]

  console.log(`Creating ${projectName}...`)

  const targetDirectory = path.resolve(`${process.cwd()}/${projectName}/`)
  const templateDirectory = path.join(__dirname, '../../', 'site-template')

  fs.mkdirAsync(targetDirectory)
    .then(() => fs.copyAsync(templateDirectory, targetDirectory))
    .then(() => {
      const message = `Successfully created ${projectName}, to start developing, ` +
        'use, reactor-cli serve'
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
