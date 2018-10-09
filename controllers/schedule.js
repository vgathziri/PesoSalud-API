const scheduleMdl = require('../models/schedule');

class ScheduleCtrl {
  constructor() {
    this.get = this.constructor.get.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async create(req, res, next) {
    try {
      const data = await scheduleMdl.create(req.body);
      res.status(200).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

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

module.exports = new ScheduleCtrl();
