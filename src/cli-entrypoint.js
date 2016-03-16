#!/usr/bin/env node
import program from 'commander'
import init from './cli/init'
import serve from './cli/serve'
import build from './cli/build'

program
  .version('0.0.1')
  .usage('<command>')
  .option('init', 'Create a new Reactor project')
  .option('serve', 'Run a Reactor server instance')
  .option('build', 'Build the static website')
  .parse(process.argv)


if (program.init) {
  init(program.args)
}

if (program.serve) {
  serve()
}

if (program.build) {
  build()
}
