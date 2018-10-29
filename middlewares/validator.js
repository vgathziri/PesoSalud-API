/**
 * [Validator-
 *The class validates and specifies the syntax rules of the data]
 */
class Validator {
  /**
   * [word Regular expression for the words introduced for the user ]
   * @type {[type]}
   * [email Regular expression for add email in data]
   * @type {[type]}
   */
  static get regex() {
    return {
      word: /[a-zA-ZñÑ ]{3,}/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  }

  /**
 * [word Fuction for validated word in data ]
 * @param  {[type]} data [Any word ]
 * @return {[type]}      [description]
 */
  static word(data) {
    return (Validator.regex.word.test(data));
  }

  /**
 * [required description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
  static required(data) {
    return data !== undefined && data !== null && data.length;
  }

  /**
 * [email description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
  static email(data) {
    return (Validator.regex.email.test(data));
  }

  /**
 * [validate description]
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next  [description]
 * @param  {[type]}   rules [description]
 * @return {[type]}         [description]
 */
  static validate(req, res, next, rules) {
    const error = {
      message: 'Validation Error',
      status: 409,
      details: {},
    };

    for (let part in rules) {
      for (let field in rules[part]) {
        let validators = rules[part][field].split(',');
        validators.forEach((f) => {
          if (!Validator[f](req[part][field] || '')) {
            if (Array.isArray(error.details[field])) {
              error.details[field].push(`The field ${field} should be a valid ${f}`);
            } else {
              error.details[field] = [`The field ${field} should be a valid ${f}`];
            }
          }
        });
      }
    }
    Object.keys(error.details).length ? next(error) : next();
  }
}

module.exports = Validator;
