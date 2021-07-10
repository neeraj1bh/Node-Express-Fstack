const http = require("http");
const EventEmitter = require("events");

const source = createEventSource("http://localhost:1337/sse");

source.on("message", console.log);

function createEventSource(url) {
  const source = new EventEmitter();

  http.get(url, (res) => {
    res.on("data", (data) => {
      const message = data
        .toString()
        .replace(/^data:/, "")
        .replace(/\n\n$/, "");

      source.emit("message", message);
    });
  });
  return source;
}
