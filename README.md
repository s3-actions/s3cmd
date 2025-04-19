# S3cmd

This action is a simple wrapper for [S3cmd](https://github.com/s3tools/s3cmd).

```yml
- name: Set up S3cmd cli tool
  uses: s3-actions/s3cmd@v1.10.1
  with:
    provider: aws # default is linode
    region: 'eu-central-1'
    access_key: ${{ secrets.S3_ACCESS_KEY }}
    secret_key: ${{ secrets.S3_SECRET_KEY }}

- name: Interact with object storage
  run: |
    s3cmd sync --recursive --acl-public dist s3://awesome.blog/
    s3cmd put dist/style.css --mime-type 'text/css' --acl-public s3://awesome.blog/style.css
    s3cmd info s3://awesome.blog
```

> [!NOTE]
> The region only matters when creating a new bucket with `mb`. In that
> case a different region apart from the default region can be provided
> ad hoc.
>
>     s3cmd mb --region ap-south-1 s3://my-bucket
>
> For linode object storage this wont work though. The region must always
> be set to US. If you want to change the region on the fly you can still
> do ith with the below command.
>
>     s3cmd mb --host ap-south-1.linodeobjects.com  s3://my-bucket

## Supported Providers

Currently the below providers are supported, but it could be used with other
providers too when using additional flags.

- AWS
- DigitalOcean
- Linode
- Scaleway
- Cloudflare
- Vultr
- CleverCloud
- Hetzner Cloud
- Synology C2
- Wasabi
- Yandex

## Inputs

### Well Known Inputs

#### `provider`

**Not Required** The s3 provider to use. Defaults to `linode`.

Supported values: `passthrough`, `aws`, `digitalocean`, `linode`, `scaleway`,
`cloudflare`, `vultr`, `clevercloud`, `hcloud`, `synologyc2`, `wasabi`,
`yandex`.

#### `secret_key`

**Required**  The buckets secret key.

#### `access_key`

**Required**  The buckets access key.

#### `region`

**Not Required** The default region to use. The default depends on the provider.

#### `account_id`

**Not Required** Cloudflare account ID. Only required when using
Cloudflare R2.

### Arbitrary Inputs

It is possible to specify aribtrary inputs. These are forwared to the
provider and eventually the config file. There is even a passthrough
provider that simply forwards all inputs to the s3cmd config file. Below
is an example using the passthrough provider, but extra inputs work for
all providers. Some of the well known inputs are removed before
forwarding.

```yaml
- name: Set up S3cmd cli tool
  uses: s3-actions/s3cmd@latest
  with:
    # these are stripped
    provider: passthrough
    access_key: ${{ secrets.S3_ACCESS_KEY }}
    secret_key: ${{ secrets.S3_SECRET_KEY }}
    # these are passed through
    bucket_host: 'my-bucket.s3.eu-central-1.amazonaws.com'
    bucket_host_style: 'path'
    bucket_location: 'eu-central-1'
    bucket_region: 'eu-central-1'
```

## Development

Copy the hooks into the git folder:

```shell
install  pre-commit.sh .git/hooks/pre-commit
```
