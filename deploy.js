import { exec } from "child_process";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const SSH_HOST = process.env.SSH_HOST;
const SSH_USER = process.env.SSH_USER;
const SSH_PASSWORD = process.env.SSH_PASSWORD;
const DEPLOY_SCRIPT_PATH =
  process.env.DEPLOY_SCRIPT_PATH ||
  "/home/sotherma/sotherma-contrats/deploy.sh";
const isWindows = os.platform() === "win32";

if (!SSH_HOST || !SSH_USER || !SSH_PASSWORD) {
  console.error("❌ Missing SSH credentials in .env");
  process.exit(1);
}

const cmd = isWindows
  ? `plink -batch -pw ${SSH_PASSWORD} ${SSH_USER}@${SSH_HOST} "bash ${DEPLOY_SCRIPT_PATH}"`
  : `SSHPASS='${SSH_PASSWORD}' sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${SSH_USER}@${SSH_HOST} "bash ${DEPLOY_SCRIPT_PATH}"`;

console.log(`🚀 Connecting to ${SSH_USER}@${SSH_HOST} to run deploy.sh...\n`);

const child = exec(cmd, { windowsHide: true });

child.stdout.on("data", (data) => process.stdout.write(data));
child.stderr.on("data", (data) => process.stderr.write(data));

child.on("exit", (code) => {
  console.log(
    code === 0
      ? "✅ Deployed successfully."
      : `❌ Deploy failed (exit code ${code})`
  );
  process.exit(code);
});
