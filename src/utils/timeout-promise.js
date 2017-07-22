export const promiseTimeout = function (ms, promise) {
  let id
  let timeout = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      reject('Timed out in ' + ms + 'ms.')
    }, ms)
  })

  return Promise.race([
    promise,
    timeout
  ]).then((result) => {
    clearTimeout(id)

    /**
     * ... we also need to pass the result back
     */
    return result
  })
}
