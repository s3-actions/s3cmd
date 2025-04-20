const { join } = require("node:path");
const { homedir } = require("node:os");
const { createWriteStream } = require("node:fs");

const defaults = require("./defaults.json");

function build(provider) {
    const opts = { ...defaults, ...provider };
    return Object.entries(opts).map(([k, v]) => `${k} = ${v}`);
}

function write(path, lines) {
    const writer = createWriteStream(path);
    for (const line of lines) {
        writer.write(line + "\r\n");
    }
}

function configure(settings, access_key, secret_key) {
    const path = process.env.S3CMD_CONFIG || join(homedir(), ".s3cfg");
    return write(path, build({ ...settings, access_key, secret_key }));
}

module.exports = {
    configure,
    build,
    write,
};
