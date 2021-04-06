const core = require('@actions/core');
const {homedir} = require('os').homedir();
const path = require('path').join(homedir, '.s3cfg')
const { providers, makeConf } = require('./providers')

const { execSync } = require('child_process');
const { writeFileSync } = require('fs')

execSync("/bin/bash -c 'pip3 install s3cmd --no-cache'")

const conf = makeConf(providers.linode({
  cluster: core.getInput("region"),
  access_key: core.getInput("access_key"),
  secret_key: core.getInput("secret_key")
}))

writeFileSync(path, conf, 'utf-8')

return 0