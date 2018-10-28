const userMdl = require('../models/users');

const tokenMdl = require('../models/token');
const permissionMdl = require('../models/permission');

class Auth {
  contructor() {
    // Binding this to not loose context on router
    this.haveSession = this.haveSession.bind(this);
  }

  async haveSession(req, res, next) {
    if (!req.headers.authorization) {
      next({
        status: 403,
        message: 'There is no authentication header in request.',
      });
      return;
    }
    let token = req.headers.authorization.split(' ')[1];
    token = await tokenMdl.getOne('Token', token);

    if (token.length !== 0 && Auth['isActive'](token)) {
      req.session = {
        token,
        user: await userMdl.findById(token[0].UserID),
      };
      next();
    } else {
      next({
        status: 403,
        message: 'Invalid token or Token has expired.',
      });
    }
  }

  async havePermission(req, res, next) {
    if (!req.session) {
      next({
        status: 403,
        message: 'There is no active session',
      });
    }

    if (await permissionMdl.getPermission(req.session.user[0], req.method, req.originalUrl)){
      next();
    } else {
      next({
        status: 403,
        message: 'Access Denied',
      });
    }
  }

  static isActive(token) {
    const createdAt = (new Date(token[0].Created_at)).getTime();
    const now = (new Date()).getTime();
    const timeExpires = token[0].Expires;
    if (now >= Auth['addHours'](createdAt, timeExpires)) {
      return false;
    }
    return true;
  }

  static addHours(date, hours) {
    return ((new Date(date)).setHours((new Date(date)).getHours() + Number(hours)));
  }
}

module.exports = new Auth();
