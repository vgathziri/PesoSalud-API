const { db } = require('../db');
/**
 * [DietsMdl is a class that initializes the functions and the prototype of them]
 */
class DietsMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.descripcion = data.Descripcion;
    this.active = data.Active;
  }

  /**
 * [Create is a method that connects the diets with the db]
 * @param  {Object]} req [a new objet]
 * @return {int}     [return ID of created obj]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Diets', obj);
    } catch (e) {
      throw e;
    } return data;
  }

  /**
   * [findAll is a method of find all diets were register]
   * @return {Object} [return objects when is find]
   */
  static async findAll() {
    let data;
    try {
      data = await db.findAll('Diets');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findById is a method of find diets by id]
   * @param  {int]}  req [dietId]
   * @return {Object} [return an object when is find]
   */
  static async findById(dietId) {
    let data;
    try {
      console.log(dietId);
      data = await db.findById('Diets', dietId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [update is a method of call update of db]
 * @param  {[Object]} req    [obj]
 * @param  {[int]}  dietId [dietId]
 * @return {Object}        [return object update if does exists]
 */
  static async update(obj, dietId) {
    let data;
    try {
      data = await db.update('Diets', obj, dietId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [processData is a function that creates array of Diets]
   * @param  {[objetc]} data [DietsMdl]
   * @return {[array]}      [returns array of Diets]
   */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new DietsMdl(d));
    });
    return array;
  }
}

module.exports = DietsMdl;
