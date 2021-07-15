module.exports = function autoCatch(handlers) {
  console.log("Handlers: ", handlers);
  if (typeof handlers === "function")
    // console.log("----> Normally returned as functions handlers: ", handlers);

  if (typeof handlers === "function") return auto(handlers);

  return Object.keys(handlers).reduce((autoHandlers, key) => {
    // console.log("----> autoHandlers: ", autoHandlers);
    // console.log("----> handlers: ", handlers);

    //Think so that here using reduce it is wrapping the handlers into promises if they are objects
    autoHandlers[key] = auto(handlers[key]);
    // console.log("----> Wrapped autoHandlers: ", autoHandlers);
    return autoHandlers;
  }, {});
};

function auto(handler) {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}
