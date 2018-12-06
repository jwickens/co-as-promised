
module.exports = function (coFunc, ...args) {
  return new Promise((resolve, reject) => {
    coFunc(...args, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
};
