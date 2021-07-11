module.exports = function autoCatch(handlers) {
  //   console.log("handlers: ", handlers);
  return Object.keys(handlers).reduce((autoHandlers, key) => {
    const handler = handlers[key];
    // console.log("handler: ", handler);
    autoHandlers[key] = (req, res, next) =>
      Promise.resolve(handler(req, res, next)).catch(next);
    // console.log("autoHandlers: ", autoHandlers);
    return autoHandlers;
  }, {});
};
