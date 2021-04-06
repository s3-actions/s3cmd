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
  linode: ({ cluster, access_key, secret_key }) => ({
    bucket_location: 'US',
    host_base: 'linodeobejcts.com',
    host_bucket: `%(bucket)s.${cluster}.linodeobejcts.com`,
    website_endpoint: `http://%(bucket)s.s3-website-${cluster}.linodeobejcts.com/`,
    access_key,
    secret_key,
  })
}

const makeConf = (provider) => {
  const opts = { ...defaults, ...provider }
  return Object.entries(opts).forEach(([k, v]) => `${k} = ${v}`).join('\n')
}

module.exports = {
  providers,
  makeConf
}

