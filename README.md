# S3cmd

This action is a simple wrapper for [S3cmd](https://github.com/s3tools/s3cmd).

## Supported Providers

Currently the below providers are supported, but it could be used with
other providers too when using additional flags.

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

### `s3cmd_version`

**Not Required** The version of s3cmd to install. Defaults to `2.4.0`.

### `provider`

**Not Required** The s3 provider to use. Defaults to `linode`.

Supported values: `aws`, `digitalocean`, `linode`, `scaleway`,
`cloudflare`, `vultr`, `clevercloud`, `hcloud`, `synologyc2`, `wasabi`,
`yandex`.

### `secret_key`

**Required**  The buckets secret key.

### `access_key`

**Required**  The buckets access key.

### `region`

**Not Required** The default region to use. The default depends on the provider.

### `account_id`

**Not Required** Cloudflare account ID. Only required when using
Cloudflare R2.

## Example usage

```yaml
- name: Set up S3cmd cli tool
  uses: s3-actions/s3cmd@v2.0.0
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

### Note

The region only matters when creating a new bucket with `mb`. In that
case a different region apart from the default region can be provided ad
hoc.

```console
s3cmd mb --region ap-south-1 s3://my-bucket
```

For linode object storage this wont work though. The region must always
be set to US. If you want to change the region on the fly you can still
do ith with the below command.

```console
s3cmd mb --host ap-south-1.linodeobjects.com  s3://my-bucket
```

## Development

Copy the hooks into the git folder:

```shell
install  pre-commit.sh .git/hooks/pre-commit
```
