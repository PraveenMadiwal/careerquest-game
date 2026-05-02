const { exec } = require("child_process");

exports.runCode = (userCode, input) => {
  return new Promise((resolve) => {

    const wrappedCode = `
      try {
        const fn = ${userCode};
        const result = fn(${input.join(",")});
        console.log(result);
      } catch (err) {
        console.log("ERROR");
      }
    `;

    const process = exec("node", { timeout: 2000 }, (error, stdout) => {
      if (error) return resolve("ERROR");
      resolve(stdout.trim());
    });

    process.stdin.write(wrappedCode);
    process.stdin.end();
  });
};