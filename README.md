# S3cmd

This action is a simple wrapper for [S3cmd](https://github.com/s3tools/s3cmd). 

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
    s3cmd sync --recursive --acl-public dist s3://awesome.blog
    s3cmd info s3://awesome.blog
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


### S3cmd Help Text

```
Usage: s3cmd [options] COMMAND [parameters]

S3cmd is a tool for managing objects in Amazon S3 storage. It allows for
making and removing "buckets" and uploading, downloading and removing
"objects" from these buckets.

Options:
  -h, --help            show this help message and exit
  --configure           Invoke interactive (re)configuration tool. Optionally
                        use as '--configure s3://some-bucket' to test access
                        to a specific bucket instead of attempting to list
                        them all.
  -c FILE, --config=FILE
                        Config file name. Defaults to $HOME/.s3cfg
  --dump-config         Dump current configuration after parsing config files
                        and command line options and exit.
  --access_key=ACCESS_KEY
                        AWS Access Key
  --secret_key=SECRET_KEY
                        AWS Secret Key
  --access_token=ACCESS_TOKEN
                        AWS Access Token
  -n, --dry-run         Only show what should be uploaded or downloaded but
                        don't actually do it. May still perform S3 requests to
                        get bucket listings and other information though (only
                        for file transfer commands)
  -s, --ssl             Use HTTPS connection when communicating with S3.
                        (default)
  --no-ssl              Don't use HTTPS.
  -e, --encrypt         Encrypt files before uploading to S3.
  --no-encrypt          Don't encrypt files.
  -f, --force           Force overwrite and other dangerous operations.
  --continue            Continue getting a partially downloaded file (only for
                        [get] command).
  --continue-put        Continue uploading partially uploaded files or
                        multipart upload parts.  Restarts parts/files that
                        don't have matching size and md5.  Skips files/parts
                        that do.  Note: md5sum checks are not always
                        sufficient to check (part) file equality.  Enable this
                        at your own risk.
  --upload-id=UPLOAD_ID
                        UploadId for Multipart Upload, in case you want
                        continue an existing upload (equivalent to --continue-
                        put) and there are multiple partial uploads.  Use
                        s3cmd multipart [URI] to see what UploadIds are
                        associated with the given URI.
  --skip-existing       Skip over files that exist at the destination (only
                        for [get] and [sync] commands).
  -r, --recursive       Recursive upload, download or removal.
  --check-md5           Check MD5 sums when comparing files for [sync].
                        (default)
  --no-check-md5        Do not check MD5 sums when comparing files for [sync].
                        Only size will be compared. May significantly speed up
                        transfer but may also miss some changed files.
  -P, --acl-public      Store objects with ACL allowing read for anyone.
  --acl-private         Store objects with default ACL allowing access for you
                        only.
  --acl-grant=PERMISSION:EMAIL or USER_CANONICAL_ID
                        Grant stated permission to a given amazon user.
                        Permission is one of: read, write, read_acp,
                        write_acp, full_control, all
  --acl-revoke=PERMISSION:USER_CANONICAL_ID
                        Revoke stated permission for a given amazon user.
                        Permission is one of: read, write, read_acp,
                        write_acp, full_control, all
  -D NUM, --restore-days=NUM
                        Number of days to keep restored file available (only
                        for 'restore' command). Default is 1 day.
  --restore-priority=RESTORE_PRIORITY
                        Priority for restoring files from S3 Glacier (only for
                        'restore' command). Choices available: bulk, standard,
                        expedited
  --delete-removed      Delete destination objects with no corresponding
                        source file [sync]
  --no-delete-removed   Don't delete destination objects.
  --delete-after        Perform deletes AFTER new uploads when delete-removed
                        is enabled [sync]
  --delay-updates       *OBSOLETE* Put all updated files into place at end
                        [sync]
  --max-delete=NUM      Do not delete more than NUM files. [del] and [sync]
  --limit=NUM           Limit number of objects returned in the response body
                        (only for [ls] and [la] commands)
  --add-destination=ADDITIONAL_DESTINATIONS
                        Additional destination for parallel uploads, in
                        addition to last arg.  May be repeated.
  --delete-after-fetch  Delete remote objects after fetching to local file
                        (only for [get] and [sync] commands).
  -p, --preserve        Preserve filesystem attributes (mode, ownership,
                        timestamps). Default for [sync] command.
  --no-preserve         Don't store FS attributes
  --exclude=GLOB        Filenames and paths matching GLOB will be excluded
                        from sync
  --exclude-from=FILE   Read --exclude GLOBs from FILE
  --rexclude=REGEXP     Filenames and paths matching REGEXP (regular
                        expression) will be excluded from sync
  --rexclude-from=FILE  Read --rexclude REGEXPs from FILE
  --include=GLOB        Filenames and paths matching GLOB will be included
                        even if previously excluded by one of
                        --(r)exclude(-from) patterns
  --include-from=FILE   Read --include GLOBs from FILE
  --rinclude=REGEXP     Same as --include but uses REGEXP (regular expression)
                        instead of GLOB
  --rinclude-from=FILE  Read --rinclude REGEXPs from FILE
  --files-from=FILE     Read list of source-file names from FILE. Use - to
                        read from stdin.
  --region=REGION, --bucket-location=REGION
                        Region to create bucket in. As of now the regions are:
                        us-east-1, us-west-1, us-west-2, eu-west-1, eu-
                        central-1, ap-northeast-1, ap-southeast-1, ap-
                        southeast-2, sa-east-1
  --host=HOSTNAME       HOSTNAME:PORT for S3 endpoint (default:
                        s3.amazonaws.com, alternatives such as s3-eu-
                        west-1.amazonaws.com). You should also set --host-
                        bucket.
  --host-bucket=HOST_BUCKET
                        DNS-style bucket+hostname:port template for accessing
                        a bucket (default: %(bucket)s.s3.amazonaws.com)
  --reduced-redundancy, --rr
                        Store object with 'Reduced redundancy'. Lower per-GB
                        price. [put, cp, mv]
  --no-reduced-redundancy, --no-rr
                        Store object without 'Reduced redundancy'. Higher per-
                        GB price. [put, cp, mv]
  --storage-class=CLASS
                        Store object with specified CLASS (STANDARD,
                        STANDARD_IA, ONEZONE_IA, INTELLIGENT_TIERING, GLACIER
                        or DEEP_ARCHIVE). [put, cp, mv]
  --access-logging-target-prefix=LOG_TARGET_PREFIX
                        Target prefix for access logs (S3 URI) (for [cfmodify]
                        and [accesslog] commands)
  --no-access-logging   Disable access logging (for [cfmodify] and [accesslog]
                        commands)
  --default-mime-type=DEFAULT_MIME_TYPE
                        Default MIME-type for stored objects. Application
                        default is binary/octet-stream.
  -M, --guess-mime-type
                        Guess MIME-type of files by their extension or mime
                        magic. Fall back to default MIME-Type as specified by
                        --default-mime-type option
  --no-guess-mime-type  Don't guess MIME-type and use the default type
                        instead.
  --no-mime-magic       Don't use mime magic when guessing MIME-type.
  -m MIME/TYPE, --mime-type=MIME/TYPE
                        Force MIME-type. Override both --default-mime-type and
                        --guess-mime-type.
  --add-header=NAME:VALUE
                        Add a given HTTP header to the upload request. Can be
                        used multiple times. For instance set 'Expires' or
                        'Cache-Control' headers (or both) using this option.
  --remove-header=NAME  Remove a given HTTP header.  Can be used multiple
                        times.  For instance, remove 'Expires' or 'Cache-
                        Control' headers (or both) using this option. [modify]
  --server-side-encryption
                        Specifies that server-side encryption will be used
                        when putting objects. [put, sync, cp, modify]
  --server-side-encryption-kms-id=KMS_KEY
                        Specifies the key id used for server-side encryption
                        with AWS KMS-Managed Keys (SSE-KMS) when putting
                        objects. [put, sync, cp, modify]
  --encoding=ENCODING   Override autodetected terminal and filesystem encoding
                        (character set). Autodetected: UTF-8
  --add-encoding-exts=EXTENSIONs
                        Add encoding to these comma delimited extensions i.e.
                        (css,js,html) when uploading to S3 )
  --verbatim            Use the S3 name as given on the command line. No pre-
                        processing, encoding, etc. Use with caution!
  --disable-multipart   Disable multipart upload on files bigger than
                        --multipart-chunk-size-mb
  --multipart-chunk-size-mb=SIZE
                        Size of each chunk of a multipart upload. Files bigger
                        than SIZE are automatically uploaded as multithreaded-
                        multipart, smaller files are uploaded using the
                        traditional method. SIZE is in Mega-Bytes, default
                        chunk size is 15MB, minimum allowed chunk size is 5MB,
                        maximum is 5GB.
  --list-md5            Include MD5 sums in bucket listings (only for 'ls'
                        command).
  -H, --human-readable-sizes
                        Print sizes in human readable form (eg 1kB instead of
                        1234).
  --ws-index=WEBSITE_INDEX
                        Name of index-document (only for [ws-create] command)
  --ws-error=WEBSITE_ERROR
                        Name of error-document (only for [ws-create] command)
  --expiry-date=EXPIRY_DATE
                        Indicates when the expiration rule takes effect. (only
                        for [expire] command)
  --expiry-days=EXPIRY_DAYS
                        Indicates the number of days after object creation the
                        expiration rule takes effect. (only for [expire]
                        command)
  --expiry-prefix=EXPIRY_PREFIX
                        Identifying one or more objects with the prefix to
                        which the expiration rule applies. (only for [expire]
                        command)
  --progress            Display progress meter (default on TTY).
  --no-progress         Don't display progress meter (default on non-TTY).
  --stats               Give some file-transfer stats.
  --enable              Enable given CloudFront distribution (only for
                        [cfmodify] command)
  --disable             Disable given CloudFront distribution (only for
                        [cfmodify] command)
  --cf-invalidate       Invalidate the uploaded filed in CloudFront. Also see
                        [cfinval] command.
  --cf-invalidate-default-index
                        When using Custom Origin and S3 static website,
                        invalidate the default index file.
  --cf-no-invalidate-default-index-root
                        When using Custom Origin and S3 static website, don't
                        invalidate the path to the default index file.
  --cf-add-cname=CNAME  Add given CNAME to a CloudFront distribution (only for
                        [cfcreate] and [cfmodify] commands)
  --cf-remove-cname=CNAME
                        Remove given CNAME from a CloudFront distribution
                        (only for [cfmodify] command)
  --cf-comment=COMMENT  Set COMMENT for a given CloudFront distribution (only
                        for [cfcreate] and [cfmodify] commands)
  --cf-default-root-object=DEFAULT_ROOT_OBJECT
                        Set the default root object to return when no object
                        is specified in the URL. Use a relative path, i.e.
                        default/index.html instead of /default/index.html or
                        s3://bucket/default/index.html (only for [cfcreate]
                        and [cfmodify] commands)
  -v, --verbose         Enable verbose output.
  -d, --debug           Enable debug output.
  --version             Show s3cmd version (2.1.0) and exit.
  -F, --follow-symlinks
                        Follow symbolic links as if they are regular files
  --cache-file=FILE     Cache FILE containing local source MD5 values
  -q, --quiet           Silence output on stdout
  --ca-certs=CA_CERTS_FILE
                        Path to SSL CA certificate FILE (instead of system
                        default)
  --check-certificate   Check SSL certificate validity
  --no-check-certificate
                        Do not check SSL certificate validity
  --check-hostname      Check SSL certificate hostname validity
  --no-check-hostname   Do not check SSL certificate hostname validity
  --signature-v2        Use AWS Signature version 2 instead of newer signature
                        methods. Helpful for S3-like systems that don't have
                        AWS Signature v4 yet.
  --limit-rate=LIMITRATE
                        Limit the upload or download speed to amount bytes per
                        second.  Amount may be expressed in bytes, kilobytes
                        with the k suffix, or megabytes with the m suffix
  --no-connection-pooling
                        Disable connection re-use
  --requester-pays      Set the REQUESTER PAYS flag for operations
  -l, --long-listing    Produce long listing [ls]
  --stop-on-error       stop if error in transfer
  --content-disposition=CONTENT_DISPOSITION
                        Provide a Content-Disposition for signed URLs, e.g.,
                        "inline; filename=myvideo.mp4"
  --content-type=CONTENT_TYPE
                        Provide a Content-Type for signed URLs, e.g.,
                        "video/mp4"

Commands:
  Make bucket
      s3cmd mb s3://BUCKET
  Remove bucket
      s3cmd rb s3://BUCKET
  List objects or buckets
      s3cmd ls [s3://BUCKET[/PREFIX]]
  List all object in all buckets
      s3cmd la 
  Put file into bucket
      s3cmd put FILE [FILE...] s3://BUCKET[/PREFIX]
  Get file from bucket
      s3cmd get s3://BUCKET/OBJECT LOCAL_FILE
  Delete file from bucket
      s3cmd del s3://BUCKET/OBJECT
  Delete file from bucket (alias for del)
      s3cmd rm s3://BUCKET/OBJECT
  Restore file from Glacier storage
      s3cmd restore s3://BUCKET/OBJECT
  Synchronize a directory tree to S3 (checks files freshness using size and md5 checksum, unless overridden by options, see below)
      s3cmd sync LOCAL_DIR s3://BUCKET[/PREFIX] or s3://BUCKET[/PREFIX] LOCAL_DIR
  Disk usage by buckets
      s3cmd du [s3://BUCKET[/PREFIX]]
  Get various information about Buckets or Files
      s3cmd info s3://BUCKET[/OBJECT]
  Copy object
      s3cmd cp s3://BUCKET1/OBJECT1 s3://BUCKET2[/OBJECT2]
  Modify object metadata
      s3cmd modify s3://BUCKET1/OBJECT
  Move object
      s3cmd mv s3://BUCKET1/OBJECT1 s3://BUCKET2[/OBJECT2]
  Modify Access control list for Bucket or Files
      s3cmd setacl s3://BUCKET[/OBJECT]
  Modify Bucket Policy
      s3cmd setpolicy FILE s3://BUCKET
  Delete Bucket Policy
      s3cmd delpolicy s3://BUCKET
  Modify Bucket CORS
      s3cmd setcors FILE s3://BUCKET
  Delete Bucket CORS
      s3cmd delcors s3://BUCKET
  Modify Bucket Requester Pays policy
      s3cmd payer s3://BUCKET
  Show multipart uploads
      s3cmd multipart s3://BUCKET [Id]
  Abort a multipart upload
      s3cmd abortmp s3://BUCKET/OBJECT Id
  List parts of a multipart upload
      s3cmd listmp s3://BUCKET/OBJECT Id
  Enable/disable bucket access logging
      s3cmd accesslog s3://BUCKET
  Sign arbitrary string using the secret key
      s3cmd sign STRING-TO-SIGN
  Sign an S3 URL to provide limited public access with expiry
      s3cmd signurl s3://BUCKET/OBJECT <expiry_epoch|+expiry_offset>
  Fix invalid file names in a bucket
      s3cmd fixbucket s3://BUCKET[/PREFIX]
  Create Website from bucket
      s3cmd ws-create s3://BUCKET
  Delete Website
      s3cmd ws-delete s3://BUCKET
  Info about Website
      s3cmd ws-info s3://BUCKET
  Set or delete expiration rule for the bucket
      s3cmd expire s3://BUCKET
  Upload a lifecycle policy for the bucket
      s3cmd setlifecycle FILE s3://BUCKET
  Get a lifecycle policy for the bucket
      s3cmd getlifecycle s3://BUCKET
  Remove a lifecycle policy for the bucket
      s3cmd dellifecycle s3://BUCKET
  List CloudFront distribution points
      s3cmd cflist 
  Display CloudFront distribution point parameters
      s3cmd cfinfo [cf://DIST_ID]
  Create CloudFront distribution point
      s3cmd cfcreate s3://BUCKET
  Delete CloudFront distribution point
      s3cmd cfdelete cf://DIST_ID
  Change CloudFront distribution point parameters
      s3cmd cfmodify cf://DIST_ID
  Display CloudFront invalidation request(s) status
      s3cmd cfinvalinfo cf://DIST_ID[/INVAL_ID]
```