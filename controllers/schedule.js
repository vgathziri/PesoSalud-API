class ScheduleCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        weekDay: 1,
        startTime: '10:00',
        endTime: '13:00',
        active: 1,
      },
    ];

    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  create(req, res) {
    const data = {
      id: req.body.id,
      weekDay: req.body.weekDay,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      active: req.body.active,
    };
    this.data.push(data);
    res.status(201).send(data);
  }

  edit(req, res) {
    const json = {
      data: this.data,
      message: 'Item update',
    };
    res.status(201).send(json);
  }

  // input: WeekDay
  // Output: Schedules List Filtered by WeekDay
  get(req, res) {
    res.send({
      data: this.data,
    });
  }
}

module.exports = new ScheduleCtrl();
