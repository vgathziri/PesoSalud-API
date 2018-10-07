const { db } = require('../db');

class MedicalRecordsMdl {
  constructor(data) {
    this.id = data.ID;
    this.userID = data.UserID;
    this.appointmentID = data.AppointmentID;
    this.serviceID = data.ServiceID;
    this.weight = data.Weight;
    this.bust = data.Bust;
    this.waistline = data.Waistline;
    this.hip = data.Hip;
    this.chest = data.Chest;
    this.abdomen = data.Abdomen;
    this.dietID = data.DietID;
    this.symptom = data.Symptom;
    this.comments = data.Comments;
    this.initialHighAbdomen = data.InitialHighAbdomen;
    this.finalHighAbdomen = data.FinalHighAbdomen;
    this.initialMediumAbdomen = data.InitialMediumAbdomen;
    this.finalMediumAbdomen = data.FinalMediumAbdomen;
    this.initialLowAbdomen = data.InitialLowAbdomen;
    this.finalLowAbdomen = data.FinalLowAbdomen;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('MedicalRecords', this)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
  }

  static findAll(table) {
    return new Promise((resolve, reject) => {
      db.findAll(table)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new MedicalRecordsMdl(d));
    });
    return array;
  }
}

module.exports = MedicalRecordsMdl;
