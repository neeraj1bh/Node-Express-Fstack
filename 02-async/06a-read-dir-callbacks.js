function mapAsync(arr, fn, onFinish) {
  let prevError;
  let nRemaining = arr.length;
  const results = [];
  arr.forEach(function (item, i) {
    fn(item, function (err, data) {
      // if (err) return onFinish(err);
      if (prevError) return;
      if (err) {
        prevError = err;
        return onFinish(err);
      }
      results[i] = data;
      nRemaining--;
      if (!nRemaining) onFinish(null, results);
    });
  });
}

// exports.mapAsync = mapAsync;
module.exports = { mapAsync };
