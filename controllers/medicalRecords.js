class MedicalRecordsCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        userID: 1,
        appointmentID: 1,
        serviceID: 1,
        weight: 71.5,
        bust: 70.1,
        waistline: 65.0,
        hip: 67.8,
        chest: 75.4,
        abdomen: 81.2,
        dietID: 1,
        symptom: 'Gripa',
        comments: 'Paciente Nuevo',
        initialHighAbdomen: 77.3,
        finalHighAbdomen: 75.8,
        initialMediumAbdomen: 77.3,
        finalMediumAbdomen: 75.8,
        initialLowAbdomen: 77.3,
        finalLowAbdomen: 75.8,
      },
    ];

    this.getByUserID = this.getByUserID.bind(this);
    this.getByAppointmentID = this.getByAppointmentID.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getByUserID(req, res) {
    res.send(this.data);
  }

  getByAppointmentID(req, res) {
    res.send(this.data);
  }

  create(req, res) {
    const data = {
      id: req.body.id,
      userID: req.body.userID,
      appointmentID: req.body.appointmentID,
      serviceID: req.body.serviceID,
      weight: req.body.weight,
      bust: req.body.bust,
      waistline: req.body.waistline,
      hip: req.body.hip,
      chest: req.body.chest,
      abdomen: req.body.abdomen,
      dietID: req.body.dietID,
      symptom: req.body.symptom,
      comments: req.body.comments,
      initialHighAbdomen: req.body.initialHighAbdomen,
      finalHighAbdomen: req.body.finalHighAbdomen,
      initialMediumAbdomen: req.body.initialMediumAbdomen,
      finalMediumAbdomen: req.body.finalMediumAbdomen,
      initialLowAbdomen: req.body.initialLowAbdomen,
      finalLowAbdomen: req.body.finalLowAbdomen,
    };

    this.data.push(data);

    res.status(201).send(data);
  }

  edit(req, res) {
    const json = {
      data: this.data,
      message: 'Item updated',
    };

    res.status(201).send(json);
  }
}

module.exports = new MedicalRecordsCtrl();
