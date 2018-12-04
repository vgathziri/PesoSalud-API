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
    let Permission = [];
    let paramsLen = Object.keys(params).length;

    try {
      let findRoute = route;
      if (params > 0) {
        findRoute = '';
        const regex = /(\/?\w+\/)/g;
        let m;
        do {
          m = regex.exec(route);
          if (m) {
            findRoute += m[0];
          }
        } while (m);
      }

      data = this.processData(await await db.findWithFilters('Permission', {
        method,
        route: findRoute,
        hasParams: (params > 0 ? 1 : 0),
      }));

      if (data.length === 0) {
        return false;
      }

      for (let e in data ) {
        let p = await db.findWithFilters('Roles_Permission', {
          RolesID: user.UserType,
          PermissionID: data[e].ID,
        });
        if(p.length > 0) {
          if (data[e].onlyUser === 0) {
            Permission.push(p);
          } else if(params[Object.keys(params)[0]] == user.id) {
            Permission.push(p);
          }
        }
      }
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
