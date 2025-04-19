const tests = {};
exports.tests = tests;

exports.aws = ({ region = "US", access_key = "", secret_key = "" }) => ({
  bucket_location: region,
  host_base: "s3.amazonaws.com",
  host_bucket: "%(bucket)s.s3.amazonaws.com",
  website_endpoint: "http://%(bucket)s.s3-website-%(location)s.amazonaws.com/",
  access_key,
  secret_key,
});

tests.aws = {
  giveInputs: {
    region: "us-east-1",
  },
  wantLines: [
    "bucket_location = us-east-1",
    "host_base = s3.amazonaws.com",
    "host_bucket = %(bucket)s.s3.amazonaws.com",
    "website_endpoint = http://%(bucket)s.s3-website-%(location)s.amazonaws.com/",
  ],
};

exports.digitalocean = ({
  region = "nyc3",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `${region}.digitaloceanspaces.com`,
  host_bucket: `%(bucket)s.${region}.digitaloceanspaces.com`,
  website_endpoint: `http://%(bucket)s.website-${region}.digitaloceanspaces.com`,
  access_key,
  secret_key,
});

tests.digitalocean = {
  giveInputs: {
    region: "nyc3",
  },
  wantLines: [
    "bucket_location = nyc3",
    "host_base = nyc3.digitaloceanspaces.com",
    "host_bucket = %(bucket)s.nyc3.digitaloceanspaces.com",
    "website_endpoint = http://%(bucket)s.website-nyc3.digitaloceanspaces.com",
  ],
};

exports.linode = ({
  region = "eu-central-1",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: "US",
  host_base: `${region}.linodeobjects.com`,
  host_bucket: `%(bucket)s.${region}.linodeobjects.com`,
  website_endpoint: `http://%(bucket)s.website-${region}.linodeobjects.com/`,
  access_key,
  secret_key,
});

tests.linode = {
  giveInputs: {
    region: "us-central-1",
  },
  wantLines: [
    "bucket_location = US",
    "host_base = us-central-1.linodeobjects.com",
    "host_bucket = %(bucket)s.us-central-1.linodeobjects.com",
    "website_endpoint = http://%(bucket)s.website-us-central-1.linodeobjects.com/",
  ],
};

exports.scaleway = ({
  region = "fr-par",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `s3.${region}.scw.cloud`,
  host_bucket: `%(bucket)s.s3.${region}.scw.cloud`,
  website_endpoint: `https://%(bucket)s.s3-website.${region}.scw.cloud/`,
  access_key,
  secret_key,
});

tests.scaleway = {
  giveInputs: {
    region: "fr-par",
  },
  wantLines: [
    "bucket_location = fr-par",
    "host_base = s3.fr-par.scw.cloud",
    "host_bucket = %(bucket)s.s3.fr-par.scw.cloud",
    "website_endpoint = https://%(bucket)s.s3-website.fr-par.scw.cloud/",
  ],
};

exports.cloudflare = ({
  account_id = "",
  region = "auto",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `${account_id}.r2.cloudflarestorage.com`,
  host_bucket: "",
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.cloudflare = {
  giveInputs: {
    account_id: "your_account_id",
    region: "auto",
  },
  wantLines: [
    "bucket_location = auto",
    "host_base = your_account_id.r2.cloudflarestorage.com",
    "host_bucket = ",
    "website_endpoint = ",
  ],
};

exports.vultr = ({ region = "ewr1", access_key = "", secret_key = "" }) => ({
  bucket_location: region,
  host_base: `${region}.vultrobjects.com`,
  host_bucket: `%(bucket)s.${region}.vultrobjects.com`,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.vultr = {
  giveInputs: {
    region: "ewr1",
  },
  wantLines: [
    "bucket_location = ewr1",
    "host_base = ewr1.vultrobjects.com",
    "host_bucket = %(bucket)s.ewr1.vultrobjects.com",
  ],
};

exports.clevercloud = ({
  region = "US",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `cellar-c2.services.clever-cloud.com`,
  host_bucket: `%(bucket)s.cellar-c2.services.clever-cloud.com`,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.clevercloud = {
  giveInputs: {
    region: "US",
  },
  wantLines: [
    "bucket_location = US",
    "host_base = cellar-c2.services.clever-cloud.com",
    "host_bucket = %(bucket)s.cellar-c2.services.clever-cloud.com",
    "website_endpoint = ",
  ],
};

exports.hcloud = ({ region = "fsn1", access_key = "", secret_key = "" }) => ({
  bucket_location: region,
  host_base: `fsn1.your-objectstorage.com`,
  host_bucket: `%(bucket)s.fsn1.your-objectstorage.com`,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.hcloud = {
  giveInputs: {
    region: "fsn1",
  },
  wantLines: [
    "bucket_location = fsn1",
    "host_base = fsn1.your-objectstorage.com",
    "host_bucket = %(bucket)s.fsn1.your-objectstorage.com",
  ],
};

exports.synologyc2 = ({
  region = "us-001",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `${region}.s3.synologyc2.net`,
  host_bucket: ``,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.synologyc2 = {
  giveInputs: {
    region: "us-001",
  },
  wantLines: [
    "bucket_location = us-001",
    "host_base = us-001.s3.synologyc2.net",
  ],
};

exports.wasabi = ({
  region = "ap-southeast-1",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `s3.${region}.wasabisys.com`,
  host_bucket: `%(bucket)s.s3.${region}.wasabisys.com`,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.wasabi = {
  giveInputs: {
    region: "ap-southeast-1",
  },
  wantLines: [
    "bucket_location = ap-southeast-1",
    "host_base = s3.ap-southeast-1.wasabisys.com",
    "host_bucket = %(bucket)s.s3.ap-southeast-1.wasabisys.com",
  ],
};

exports.yandex = ({
  region = "ru-central1",
  access_key = "",
  secret_key = "",
}) => ({
  bucket_location: region,
  host_base: `storage.yandexcloud.net`,
  host_bucket: `%(bucket)s.storage.yandexcloud.net`,
  website_endpoint: "",
  access_key,
  secret_key,
});

tests.yandex = {
  giveInputs: {
    region: "ru-central1",
  },
  wantLines: [
    "bucket_location = ru-central1",
    "host_base = storage.yandexcloud.net",
    "host_bucket = %(bucket)s.storage.yandexcloud.net",
  ],
};
