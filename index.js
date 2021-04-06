const core = require('@actions/core');

exec("python -V", (error, stdout, stderr) => {
  if (error) {
    core.setFailed(error.message);
    return;
  }
  if (stderr) {
    core.setFailed(stderr);
    return;
  }
  return core.getInput(`stdout: ${stdout}`);
});
