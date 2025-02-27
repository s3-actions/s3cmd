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

const vultrWriter = createWriteStream('assets/test-results/vultr')

const vultrConf = makeConf(providers.vultr({
  cluster: "ewr1",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))


for (const line of vultrConf) {
  vultrWriter.write(line + '\r\n')
}


const clevercloudWriter = createWriteStream('assets/test-results/clevercloud')
const clevercloudConf = makeConf(providers.clevercloud({
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

for (const line of clevercloudConf) {
  clevercloudWriter.write(line + '\r\n')
}

const hcloudWriter = createWriteStream('assets/test-results/hcloud')
const hcloudConf = makeConf(providers.hcloud({
  access_key: 'top-secret',
  secret_key: 'more secret'
}))

for (const line of hcloudConf) {
  hcloudWriter.write(line + '\r\n')
}


const synologyc2Writer = createWriteStream('assets/test-results/synologyc2')

const synologyc2Conf = makeConf(providers.synologyc2({
  cluster: "us-001",
  access_key: 'top-secret',
  secret_key: 'more secret'
}))


for (const line of synologyc2Conf) {
  synologyc2Writer.write(line + '\r\n')
}
