const { db } = require('../db');

class PermissionMdl {
  constructor(data) {
    this.ID = data.ID;
    this.Route = data.Route;
    this.Method = data.Method;
    this.Active = data.Active;
  }

  static async getPermission(user, method, route) {
    let data;
    let Permission;
    try {
      data = this.processData(await await db.findWithFilters('Permission', {
        method,
        route,
      }));

      Permission = await db.findWithFilters('Roles_Permission', {
        RolesID: user.UserType,
        PermissionID: data[0].ID,
      });
    } catch (e) {
      throw e;
    }
    return Permission.length > 0;
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new PermissionMdl(d));
    });
    return array;
  }
}

module.exports = PermissionMdl;
