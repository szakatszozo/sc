const { spawn } = require('child_process');

export default async function handler(req, res) {
  const { command } = req.query;
  try {
    const ret = spawn(command, { shell: true });

    // ret.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
    // ret.stderr.on('data', (data) => {
    //   console.log(`stderr: ${data}`);
    // });
    // ret.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });
    res.status(200).json({ output: 'spawned' });
  } catch (error) {
    res.status(200).json({ error });
  }
};
