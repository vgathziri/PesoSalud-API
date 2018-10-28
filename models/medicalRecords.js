const { db } = require('../db');
/**
 * [MedicalRecordsMdl is a class that initializes the functions and the prototype of them]
 */
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

  /**
  * [Create is a method that connects the MedicalRecords with the db]
  * @param  {Object]} req [a new objet]
  * @return {int}     [return ID of created obj]
  */
  static async create(obj) {
    let data;
    try {
      data = await db.create('MedicalRecords', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [findByUser is a method of find MedicalRecords by userID]
   * @param  {int]}  req [UserID]
   * @return {Object} [return an object when is find]
   */
  static async findByUser(userID) {
    let data;
    try {
      data = await db.findByAttribute('MedicalRecords', 'UserID', userID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findByAppointmentID is a method of find MedicalRecords by appointmentID]
   * @param  {int]}  req [appointmentID]
   * @return {Object} [return an object when is find]
   */
  static async findByAppointmentID(appointmentID) {
    let data;
    try {
      data = await db.findByAttribute('MedicalRecords', 'AppointmentID', appointmentID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [edit is a method of call update of db]
 * @param  {[Object]} req    [obj]
 * @param  {[int]}  id [id]
 * @return {Object}        [return object update if does exists]
 */
  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('MedicalRecords', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [processData is a function that creates array of MedicalRecords]
   * @param  {[objetc]} data [MedicalRecordsMdl]
   * @return {[array]}      [returns array of MedicalRecords]
   */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new MedicalRecordsMdl(d));
    });
    return array;
  }
}

module.exports = MedicalRecordsMdl;
