/**
 * [errorHandler is a function that response and recovery procedures from error conditions ]
 * @param  {[]}   err  [error]
 * @param  {[]}   req  [request]
 * @param  {[]}   res  [response]
 * @return {[response]}        [returns status 500 mentioning that there was an error on the server]
 */
function errorHandler(err, req, res, next) {
  console.error('Error handler', err);
  return res.status(err.status || 500).send(err);
}

module.exports = errorHandler;
