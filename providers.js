const defaults = require('./defaults.json')

const providers = {
  aws: ({ default_region = 'US', access_key, secret_key, access_token }) => ({
    bucket_location: default_region,
    host_base: 's3.amazonaws.com',
    host_bucket: '%(bucket)s.s3.amazonaws.com',
    website_endpoint: 'http://%(bucket)s.s3-website-%(location)s.amazonaws.com/',
    access_key,
    secret_key,
    access_token,
  }),
  linode: ({ cluster = 'eu-central-1', access_key = '', secret_key = '' }) => ({
    bucket_location: 'US',
    host_base: `${cluster}.linodeobjects.com`,
    host_bucket: `%(bucket)s.${cluster}.linodeobjects.com`,
    website_endpoint: `http://%(bucket)s.website-${cluster}.linodeobjects.com/`,
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

