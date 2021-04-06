const core = require('@actions/core');

const {exec} = require('child_process');

exec("/bin/bash -c 'pip3 install s3cmd --no-cache'", (error, stdout, stderr) => {
  if (error) {
    core.setFailed(error.message);
    return;
  }
  if (stderr) {
    core.setFailed(stderr);
    return;
  }
  return core.setOutput("stdout", stdout);
});
