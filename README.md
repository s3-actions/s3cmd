# S3cmd

This action is a simple wrapper for [S3cmd](https://s3tools.org/s3cmd). 

It is currently only tested with linode. It wokrs with all environemts though, it just a matter of setting the right falgs.

## Inputs

### `cluster`

**Not required** The cluster the buckets reside in. Default `"ap-south-1"`.

### `acces_key`

**Required**  The buckets access key.

### `acces_key`

**Required**  The buckets secret key.
## Example usage


```yml
on:
  push:
    branches:
      - main

jobs:
  expose_s3cmd:
    runs-on: ubuntu-latest
    
    name: Use S3cmd
    steps:
      - name: Set up S3cmd cli tool.
        uses: s3-actions/s3cmd@v0
        with:
          cluster: 'eu-central-1'
          access_key: ${{ secrets.S3_ACCESS_KEY }}
          secret_key: ${{ secrets.S3_SECRET_KEY }}

      - name: Interact with object storage.
        run: |
          echo 'foo' >> bar
          s3cmd put bar s3://foobarbaz

```
