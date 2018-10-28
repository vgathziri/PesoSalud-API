/**
 * [ensureAuth description]
 * @param  {[]}   req  [description]
 * @param  {[]}   res  [description]
 * @param  {Function} next [description]
 * @return {[response]}        []
 */
exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'There is no authentication header in request.' });
  }
  next();
};
