const scheduleMdl = require('../models/schedule');

class ScheduleCtrl {
  constructor() {
    this.get = this.constructor.get.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  /**
 *
 * [create -Function for Add a new Object Schedule]
 * @param  {[body]}   req  [Clientś required for Schedule]
 * @param  {[status]} res  [response that status to the fuction]
 * @param  {create}   next [Argument for the next fuction to middlewear]
 * @return {Promise}       [Continue with the next fuction]
 */
  static async create(req, res, next) {
    try {
      const data = await scheduleMdl.create(req.body);
      res.status(200).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [edit Fuction search the register whith ID for changes data ]
 * @param  {[Id]}   req  [Client request for edit by id of user]
 * @param  {[status]}   res  [Status for the fuction if doesn´t found]
 * @param  {Fuction} next [Argument for continue the next fuction to middlewear]
 * @return {status}       [send message when the iteam are updated ]
 */
  static async edit(req, res, next) {
    try {
      const data = await scheduleMdl.edit(req.body, req.params.ID);

      if (data.length === 0) {
        res.status(400).send({ message: 'Schedule could not be found' });
        return;
      }
    } catch (e) {
      next(e);
    }
    res.status(200).send({ message: 'Item updated' });
  }

  /**
 * [get Show the Schedules for especific weekDay]
 * @param  {[weekDay]}   req  [Clien require for attribute weekDay especific]
 * @param  {[status]}   res  [In case especific data in weekDay doesn´t found ]
 * @param  {Function} next [Continue to the next fuction in the middlewear]
 * @return {Status}       [Message when the data is send ]
 */
  // input: WeekDay
  // Output: Schedules List Filtered by WeekDay

  static async get(req, res, next) {
    let data;
    try {
      data = await scheduleMdl.findByWeekday(req.params.weekDay);
      if (data.length === 0) {
        res.status(400).send({ message: 'Schedule not found' });
        return;
      }
    } catch (e) {
      next(e);
    }

    res.status(200).send({ data });
  }
}

/**
 * [exports Fuction Ctrl in  object for the use in the other files  ]
 * @type {ScheduleCtrl}
 */
module.exports = new ScheduleCtrl();
