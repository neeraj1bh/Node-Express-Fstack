const fs = require("fs");
const { clearInterval } = require("timers");

const writeStream = fs.createWriteStream("time.log");
const interval = setInterval(
  () => writeStream.write(`The time is now: ${new Date()}\n`),
  1000
);
setTimeout(() => {
  clearInterval(interval);
}, 1000 * 11);
