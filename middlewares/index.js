exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'There is no authentication header in request.' });
  }
  next();
};
