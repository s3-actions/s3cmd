const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')

const conf = makeConf(providers.linode({
  cluster: "eu-central-1",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

const writer = createWriteStream('assets/test-result')

for (const line of conf) {
  writer.write(line+'\r\n')
}

