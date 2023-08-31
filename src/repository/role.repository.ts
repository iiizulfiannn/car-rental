import Role from "../model/role.model";

interface IRoleRepository {
  getRole(id: number): Role;
}

class RoleRepository implements IRoleRepository {
  getRole(id: number): Role {
    if (id === 1) {
      return { id: 1, name: "admin" };
    } else {
      return { id: 2, name: "user" };
    }
  }
}

export default new RoleRepository();
