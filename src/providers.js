const defaults = require('./defaults.json')

const providers = {
  aws: ({ region = 'US', access_key = '', secret_key = ''}) => ({
    bucket_location: region,
    host_base: 's3.amazonaws.com',
    host_bucket: '%(bucket)s.s3.amazonaws.com',
    website_endpoint: 'http://%(bucket)s.s3-website-%(location)s.amazonaws.com/',
    access_key,
    secret_key,
  }),
  digitalocean: ({ region = 'nyc3', access_key = '', secret_key = ''}) => ({
    bucket_location: region,
    host_base: `${region}.digitaloceanspaces.com`,
    host_bucket: `%(bucket)s.${region}.digitaloceanspaces.com`,
    website_endpoint: `http://%(bucket)s.website-${region}.digitaloceanspaces.com`,
    access_key,
    secret_key,
  }),
  linode: ({ region = 'eu-central-1', access_key = '', secret_key = '' }) => ({
    bucket_location: 'US',
    host_base: `${region}.linodeobjects.com`,
    host_bucket: `%(bucket)s.${region}.linodeobjects.com`,
    website_endpoint: `http://%(bucket)s.website-${region}.linodeobjects.com/`,
    access_key,
    secret_key,
  }),
  scaleway: ({ region = 'fr-par', access_key = '', secret_key = '' }) => ({
    bucket_location: region,
    host_base: `s3.${region}.scw.cloud`,
    host_bucket: `%(bucket)s.s3.${region}.scw.cloud`,
    website_endpoint: `https://%(bucket)s.s3-website.${region}.scw.cloud/`,
    access_key,
    secret_key,
  })
}

const makeConf = (provider) => {
  const opts = { ...defaults, ...provider }
  return Object.entries(opts).map(([k, v]) => `${k} = ${v}`)
}

module.exports = {
  providers,
  makeConf
}

