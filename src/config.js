const { join } = require("node:path");
const { homedir } = require("node:os");
const { createWriteStream } = require("node:fs");

const defaults = require("./defaults.json");

function toLines(settings) {
  return Object.entries(settings).map(([k, v]) => `${k} = ${v}`);
}

function writeLines(path, lines) {
  const writer = createWriteStream(path);
  for (const line of lines) {
    writer.write(line + "\r\n");
  }
}

function configPath() {
  return process.env.S3CMD_CONFIG || join(homedir(), ".s3cfg");
}

function configure(settings) {
  return writeLines(configPath(), toLines(settings));
}

module.exports = {
  defaults,
  toLines,
  writeLines,
  configPath,
  configure,
};
