# S3cmd

This action is a simple wrapper for [S3cmd](https://s3tools.org/s3cmd). 

It is currently only tested with linode. It works with all environments though, it just a matter of setting the right flags.

## Inputs

### `region`

**Not required** The default region to use.

### `access_key`

**Required**  The buckets access key.

### `secret_key`

**Required**  The buckets secret key.

## Example usage

```yml
- name: Set up S3cmd cli tool
  uses: s3-actions/s3cmd@v1
  with:
    provider: aws # default is linode
    region: 'eu-central-1'
    access_key: ${{ secrets.S3_ACCESS_KEY }}
    secret_key: ${{ secrets.S3_SECRET_KEY }}

- name: Interact with object storage
  run: |
    buck="github-action-${{ github.run_id }}"
    mkdir example
    s3cmd mb s3://$buck
    echo 'foo' >> example/bar
    s3cmd put example/bar s3://foobarbaz
    mkdir -p example/baz/bar
    echo 'fizz' >> example/baz/bar/faz
    sleep 5
    s3cmd sync --recursive --acl-public example s3://$buck
    sleep 5
    s3cmd rm -r --force s3://$buck
    sleep 5
    s3cmd rb s3://$buck

```


### Note

The region only matters when creating a new bucket with `mb`. In that case a different region apart from the default region can be provided ad hoc.

```console
s3cmd mb --region ap-south-1 s:·//my-bucket
```

For linode object storage this wont work though. The region must always be set to US. If you want to change the region on the fly you can still do ith with the below command.

```console
s3cmd mb --host ap-south-1.linodeobjects.com  s3://my-bucket
```