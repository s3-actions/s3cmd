const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')

const conf = makeConf(providers.linode({
  cluster: "eu-central-1",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

const conf2 = makeConf(providers.digitalocean({
  cluster: "nyc3",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

const writer = createWriteStream('test')

for (const line of conf) {
  writer.write(line+'\r\n')
}

for (const line of conf2) {
  writer.write(line+'\r\n')
}