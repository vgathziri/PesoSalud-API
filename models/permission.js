const { db } = require('../db');
/**
 * [PermissionMdl Class to manage user permissions to control their activities]
 */
class PermissionMdl {
  constructor(data) {
    this.ID = data.ID;
    this.Route = data.Route;
    this.Method = data.Method;
    this.hasParams = data.hasParams;
    this.onlyUser = data.onlyUser;
    this.Active = data.Active;
  }

  /**
 * [getPermission shows the permissions assigned to the different users]
 * @param  {[Data]}  user   [user type specification]
 * @param  {[Object]}  method [Dato , Attribute of the same class]
 * @param  {[Object]}  route  [route you are trying to access]
 * @return {Promise}        [Validate if the user has the permission for the action ]
 */
  static async getPermission(user, method, route, params) {
    let data;
    let Permission;
    try {
      data = this.processData(await await db.findWithFilters('Permission', {
        method,
        route,
        hasParams: params === undefined,
      }));

      if (data.length === 0) {
        return false;
      }

      if (data[0].onlyUser === 1 && params[0] !== user.ID) {
        return false;
      }

      Permission = await db.findWithFilters('Roles_Permission', {
        RolesID: user.UserType,
        PermissionID: data[0].ID,
      });

    } catch (e) {
      throw e;
    }
    return Permission.length > 0;
  }

  /**
 * [processData go through the permissions to add ]
 * @param  {[Object]} data [Action that userś want to do ]
 * @return {[Array]}      [go through the permissions to add permission]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new PermissionMdl(d));
    });
    return array;
  }
}

module.exports = PermissionMdl;
