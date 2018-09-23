class ScheduleCtrl {
  create(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      weekDay: req.body.weekDay,
      startTime: req.body.weekDay,
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
  search(req, res) {
    const data = this.data.find(el => el.weekDay === Number(req.params.weekDay));
    res.send(data);
  }
}

module.exports = new ScheduleCtrl();
