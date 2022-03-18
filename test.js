const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')


const linodeWriter = createWriteStream('assets/test-result-linode')

const linodeConf = makeConf(providers.linode({
  cluster: "eu-central-1",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))


for (const line of linodeConf) {
  linodeWriter.write(line + '\r\n')
}


const digitaloceanConf = makeConf(providers.digitalocean({
  cluster: "nyc3",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

const digitaloceanWriter = createWriteStream('assets/test-result-digitalocean')

for (const line of digitaloceanConf) {
  digitaloceanWriter.write(line + '\r\n')
}
