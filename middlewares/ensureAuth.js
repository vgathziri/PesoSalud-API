const userMdl = require('../models/users');

const tokenMdl = require('../models/token');
const permissionMdl = require('../models/permission');

/**
   * [Auth is a class that initializes the functions and the prototype of them]   */
class Auth {
  contructor() {
    // Binding this to not loose context on router
    this.haveSession = this.haveSession.bind(this);
  }

  /**
 * [haveSession is a method that create a session for users who maintain an active token]
 * @param  {[Object]}   req  [session of user, token, userMdl, and originalUrl gets the route request]
  * @return {status}       [returns status 403 if doens't extis access the route]
 */
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
        message: 'Invalid token or token has expired.',
      });
    }
  }

  /**
 * [havePermission description]
 * @param  {[Object]}   req  [session of user]
 * @return {status}       [returns status 403 if doesn't exist session]
 */
  async havePermission(req, res, next) {
    if (!req.session) {
      next({
        status: 403,
        message: 'There is no active session',
      });
    }

    if (Number(req.session.user.Active) === 0){
      next({
        status: 403,
        message: 'This user is not active',
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

/**
 * [isActive is a method that calculates the time of an active token]
 * @param  {[Object]}  token [token of a active session]
 * @return {Boolean}       [returns false if token expires or true if token is still active]
 */
  static isActive(token) {
    const createdAt = (new Date(token[0].Created_at)).getTime();
    const now = (new Date()).getTime();
    const timeExpires = token[0].Expires;
    if (now >= Auth['addHours'](createdAt, timeExpires)) {
      return false;
    }
    return true;
  }

  /**
   * [addHours is a method that calculates actual time]
   * @param {[Object]} date  [date of token, hours ]
   * @param {[type]} hours [description]
   * @return {Object} [returns the actual date and time]
   */
  static addHours(date, hours) {
    return ((new Date(date)).setHours((new Date(date)).getHours() + Number(hours)));
  }
}

module.exports = new Auth();
