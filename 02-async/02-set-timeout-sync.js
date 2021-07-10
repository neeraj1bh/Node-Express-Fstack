let count = 0;
setInterval(() => {
  console.log(`${++count} mississippi`);
}, 1000);

setTimeoutSync(5500);
console.log("hello from the past!");
process.exit();

function setTimeoutSync(ms) {
  const time = Date.now();
  while (Date.now - time < ms) {}
}
