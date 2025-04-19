const tests = [];
exports.tests = tests;

// the user inputs are merged ontop of the defaults.
// the result is passed to one of the provider functions.
// the provider should return the entire settings object back,
// but it can modify them before doing so.
// by destructing the interesting properties and spreading the rest,
// keys can be removed or moedified. In the return object, the rest
// should be spread back before the provider settings.

exports.passthrough = (settings) => settings;

tests.push({
  giveInputs: { provider: "passthrough", foo: "bar" },
  wantLines: ["foo = bar"],
});

exports.aws = ({ region = "US", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: "s3.amazonaws.com",
  host_bucket: "%(bucket)s.s3.amazonaws.com",
  website_endpoint: "http://%(bucket)s.s3-website-%(location)s.amazonaws.com/",
});

tests.push({
  giveInputs: {
    provider: "aws",
    region: "us-east-1",
    secret_key: "foo",
    access_key: "bar",
  },
  wantLines: [
    "bucket_location = us-east-1",
    "host_base = s3.amazonaws.com",
    "host_bucket = %(bucket)s.s3.amazonaws.com",
    "website_endpoint = http://%(bucket)s.s3-website-%(location)s.amazonaws.com/",
  ],
});

exports.digitalocean = ({ region = "nyc3", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `${region}.digitaloceanspaces.com`,
  host_bucket: `%(bucket)s.${region}.digitaloceanspaces.com`,
  website_endpoint: `http://%(bucket)s.website-${region}.digitaloceanspaces.com`,
});

tests.push({
  giveInputs: {
    provider: "digitalocean",
    region: "nyc3",
  },
  wantLines: [
    "bucket_location = nyc3",
    "host_base = nyc3.digitaloceanspaces.com",
    "host_bucket = %(bucket)s.nyc3.digitaloceanspaces.com",
    "website_endpoint = http://%(bucket)s.website-nyc3.digitaloceanspaces.com",
  ],
});

exports.linode = ({ region = "eu-central-1", ...settings }) => ({
  ...settings,
  bucket_location: "US",
  host_base: `${region}.linodeobjects.com`,
  host_bucket: `%(bucket)s.${region}.linodeobjects.com`,
  website_endpoint: `http://%(bucket)s.website-${region}.linodeobjects.com/`,
});

tests.push({
  giveInputs: {
    provider: "linode",
    region: "us-central-1",
  },
  wantLines: [
    "bucket_location = US",
    "host_base = us-central-1.linodeobjects.com",
    "host_bucket = %(bucket)s.us-central-1.linodeobjects.com",
    "website_endpoint = http://%(bucket)s.website-us-central-1.linodeobjects.com/",
  ],
});

exports.scaleway = ({ region = "fr-par", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `s3.${region}.scw.cloud`,
  host_bucket: `%(bucket)s.s3.${region}.scw.cloud`,
  website_endpoint: `https://%(bucket)s.s3-website.${region}.scw.cloud/`,
});

tests.push({
  giveInputs: {
    provider: "scaleway",
    region: "fr-par",
  },
  wantLines: [
    "bucket_location = fr-par",
    "host_base = s3.fr-par.scw.cloud",
    "host_bucket = %(bucket)s.s3.fr-par.scw.cloud",
    "website_endpoint = https://%(bucket)s.s3-website.fr-par.scw.cloud/",
  ],
});

exports.cloudflare = ({ account_id = "", region = "auto", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `${account_id}.r2.cloudflarestorage.com`,
  host_bucket: "",
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "cloudflare",
    account_id: "your_account_id",
    region: "auto",
  },
  wantLines: [
    "bucket_location = auto",
    "host_base = your_account_id.r2.cloudflarestorage.com",
    "host_bucket = ",
    "website_endpoint = ",
  ],
});

exports.vultr = ({ region = "ewr1", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `${region}.vultrobjects.com`,
  host_bucket: `%(bucket)s.${region}.vultrobjects.com`,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "vultr",
    region: "ewr1",
  },
  wantLines: [
    "bucket_location = ewr1",
    "host_base = ewr1.vultrobjects.com",
    "host_bucket = %(bucket)s.ewr1.vultrobjects.com",
  ],
});

exports.clevercloud = ({ region = "US", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `cellar-c2.services.clever-cloud.com`,
  host_bucket: `%(bucket)s.cellar-c2.services.clever-cloud.com`,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "clevercloud",
    region: "US",
  },
  wantLines: [
    "bucket_location = US",
    "host_base = cellar-c2.services.clever-cloud.com",
    "host_bucket = %(bucket)s.cellar-c2.services.clever-cloud.com",
    "website_endpoint = ",
  ],
});

exports.hcloud = ({ region = "fsn1", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `fsn1.your-objectstorage.com`,
  host_bucket: `%(bucket)s.fsn1.your-objectstorage.com`,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "hcloud",
    region: "fsn1",
  },
  wantLines: [
    "bucket_location = fsn1",
    "host_base = fsn1.your-objectstorage.com",
    "host_bucket = %(bucket)s.fsn1.your-objectstorage.com",
  ],
});

exports.synologyc2 = ({ region = "us-001", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `${region}.s3.synologyc2.net`,
  host_bucket: ``,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "synologyc2",
    region: "us-001",
  },
  wantLines: [
    "bucket_location = us-001",
    "host_base = us-001.s3.synologyc2.net",
  ],
});

exports.wasabi = ({ region = "ap-southeast-1", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `s3.${region}.wasabisys.com`,
  host_bucket: `%(bucket)s.s3.${region}.wasabisys.com`,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "wasabi",
    region: "ap-southeast-1",
  },
  wantLines: [
    "bucket_location = ap-southeast-1",
    "host_base = s3.ap-southeast-1.wasabisys.com",
    "host_bucket = %(bucket)s.s3.ap-southeast-1.wasabisys.com",
  ],
});

exports.yandex = ({ region = "ru-central1", ...settings }) => ({
  ...settings,
  bucket_location: region,
  host_base: `storage.yandexcloud.net`,
  host_bucket: `%(bucket)s.storage.yandexcloud.net`,
  website_endpoint: "",
});

tests.push({
  giveInputs: {
    provider: "yandex",
    region: "ru-central1",
  },
  wantLines: [
    "bucket_location = ru-central1",
    "host_base = storage.yandexcloud.net",
    "host_bucket = %(bucket)s.storage.yandexcloud.net",
  ],
});
