const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// listener opcional para debug
rl.on("line", line => console.log("[DEBUG] user input:", line));
module.exports = rl;
