const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')


const linodeWriter = createWriteStream('assets/test-results/linode')

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

const digitaloceanWriter = createWriteStream('assets/test-results/digitalocean')

for (const line of digitaloceanConf) {
  digitaloceanWriter.write(line + '\r\n')
}

const cloudflareConf = makeConf(
  providers.cloudflare({
    account_id: "123abc",
    access_key: "top-secret",
    secret_key: "more secret",
  })
);

const cloudflareWriter = createWriteStream("assets/test-results/cloudflare");

for (const line of cloudflareConf) {
  cloudflareWriter.write(line + "\r\n");
}
