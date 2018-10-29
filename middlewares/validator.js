/**
 * [Validator-
 *The class validates and specifies the syntax rules of the data]
 */
class Validator {
  /**
   * [word Regular expression for the words introduced for the user ]
   * @type {[varchar]}
   * [email Regular expression for add email in data]
   * @type {[varchar]}
   */
  static get regex() {
    return {
      word: /[a-zA-ZñÑ ]{3,}/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  }

  /**
 * ["word" Fuction for validated word in data ]
 * @param  {[Object]} data [Any word inside API to add or updated regiters]
 * @return {[Fuction]}      [Fuction to test regular expression inside the words ]
 */
  static word(data) {
    return (Validator.regex.word.test(data));
  }

  /**
 * ["required" fuction for validated when data introduced its empty or incorrect]
 * @param  {[Object]} data [Data introduced by user ]
 * @return {[Fuction]}      [Fuction for compare data with other cases]
 */
  static required(data) {
    return data !== undefined && data !== null && data.length;
  }

  /**
 * ["email" Fuction to Valited regular expression to entry data to e-mail ]
 * @param  {[Object]} data [Data introduced by user, to validate]
 * @return {[Fuction]}      [Fuction to validate the rules with regular expression]
 */
  static email(data) {
    return (Validator.regex.email.test(data));
  }

  /**
 * [validate Fuction general to validate with diferent rules and details]
 * @param  {[Object]}   req   [data introced by user to validate]
 * @param  {[Object]}   res   [type of rule to aplicate]
 * @param  {Function} next  [Continue with the next fuction in case of error ]
 * @param  {[Object]}   rules [validate with especific rule in especial case of data]
 * @return {[message]}         [Details to validate the mistake ]
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
