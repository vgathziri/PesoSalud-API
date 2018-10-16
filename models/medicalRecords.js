const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

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

  static async create(obj) {
    let data;
    try {
      data = await db.create('MedicalRecords', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findByUser(userID) {
    let data;
    try {
      data = await db.findByAttribute('MedicalRecords', 'UserID', userID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findByAppointmentID(appointmentID) {
    let data;
    try {
      data = await db.findByAttribute('MedicalRecords', 'AppointmentID', appointmentID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('MedicalRecords', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
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
