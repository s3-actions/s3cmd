const assert = require("node:assert");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { tests } = require("./src/providers");

const { RunOptions, RunTarget } = require("github-action-ts-run-api");

(async () => {
  for (const [provider, { giveInputs, wantLines }] of Object.entries(tests)) {
    console.log(`\n---\nTesting provider: ${provider}`);

    const target = RunTarget.mainJs("action.yml");
    const options = RunOptions.create()
      .setFakeFsOptions({ rmFakedTempDirAfterRun: false })
      .setInputs({ ...giveInputs, provider });

    const res = await target.run(options);
    try {
      assert.strictEqual(res.exitCode, 0);

      const b = readFileSync(join(res.tempDirPath, "s3cmd.conf"));
      const data = b.toString();
      for (const line of wantLines) {
        assert.ok(data.includes(line), `${provider}: missing line: ${line}`);
      }
    } finally {
      res.cleanUpFakedDirs();
    }
  }
})();
