const { EntitySchema } = require("typeorm");

const Role = new EntitySchema({
  name: "Role",
  tableName: "roles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      unique: true,
    },
  },
  relations: {
    permissions: {
      target: "Permission", // many-to-many with Permission
      type: "many-to-many",
      joinTable: {
        name: "role_permissions", // pivot/intermediary table
        joinColumn: {
          name: "role_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "permission_id",
          referencedColumnName: "id",
        },
      },
    },
    teachers: {
      target: "Teacher", // one role → many teachers
      type: "one-to-many",
      inverseSide: "role",
    },
  },
});

module.exports = { Role };
