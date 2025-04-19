const { execSync } = require("node:child_process");

const core = require("@actions/core");

const { configure } = require("./config");
const providers = require("./providers");

try {
  const s = execSync("s3cmd --version").toString().trim();
  core.notice(`s3cmd already installed: ${s}`);
} catch {
  const s3cmdVersion = core.getInput("s3cmd_version") || "2.4.0";

  const cmd = [
    "pip3",
    "install",
    `s3cmd==${s3cmdVersion}`,
    "--no-cache",
    "--break-system-packages",
  ];

  // on new versions of linux, pip wont install system wide packages
  // without using the --break-system-packages flag. however, on older
  // systems, this flag is not known to pip and will cause an error.
  try {
    core.notice("attempting to install s3cmd");
    core.debug(execSync(cmd.join(" ")).toString());
  } catch {
    core.debug("pip3 install failed, trying without --break-system-packages");
    cmd.pop();
    core.debug(execSync(cmd.join(" ")).toString());
  }
}

// set the config file location via env var to the github temp dir.
// the variable needs to persist for subsequent commands, so we set it as a
// github action variable as well.
if (process.env.RUNNER_TEMP) {
  process.env.S3CMD_CONFIG = `${process.env.RUNNER_TEMP}/s3cmd.conf`;
  core.exportVariable("S3CMD_CONFIG", process.env.S3CMD_CONFIG);
  core.debug(`S3CMD_CONFIG=${process.env.S3CMD_CONFIG}`);
}

configure(
  providers[core.getInput("provider")]({
    region: core.getInput("region"),
    account_id: core.getInput("account_id"),
    access_key: core.getInput("access_key"),
    secret_key: core.getInput("secret_key"),
  }),
);

return 0;
