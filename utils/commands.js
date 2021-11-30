
import { spawnCommand } from './spwan-command';
import { executeCommand } from './execute-command';
import { parsePidFromLsof } from './disect';

const relativePath = process.env.NEXT_PUBLIC_APPS_RELATIVE_PATH;

const startVSCodeCommand = repo =>
  `cd ${relativePath}/${repo} && code .`;

export const startVSCode = async repo =>
  await spawnCommand(startVSCodeCommand(repo));

export const getTcpConnectionCmd = portNumber => `nc -vz localhost ${portNumber}`;

const getAppPidCmd = portNumber => `lsof -i -P|grep ${portNumber}`;

export const getAppPid = async port => {
  const result = await executeCommand(getAppPidCmd(port));
  return parsePidFromLsof(result.output);
};

export const startBrowserWithLink = async (browser, link) =>
  await spawnCommand(`open -a "${browser}" ${link}`);

export const isHealthy = async url => {
  const response = await executeCommand(`curl --max-time 5 ${url}`);
  return response.output.includes('I am healthy!');
};

export const getCurrentBranchCmd = repo =>
  `cd ${relativePath}/${repo} && git branch --show-current`;
