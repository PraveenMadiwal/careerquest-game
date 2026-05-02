const { exec } = require("child_process");

exports.runCode = (userCode, input, language = "js") => {
  return new Promise((resolve) => {

    if (language === "js") {
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
    } 
    else if (language === "python") {
      resolve("Python not supported yet");
    } 
    else if (language === "java") {
      resolve("Java not supported yet");
    } 
    else {
      resolve("Invalid language");
    }

  });
};