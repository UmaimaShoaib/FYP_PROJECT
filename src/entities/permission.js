const { EntitySchema } = require("typeorm");

const Permission = new EntitySchema({
  name: "Permission",
  tableName: "permissions",
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
    slug: {
      type: "varchar",
      length: 100,
      unique: true,
    },
    read: {
      type: "boolean",
      default: false,
    },
    add: {
      type: "boolean",
      default: false,
    },
    edit: {
      type: "boolean",
      default: false,
    },
    delete: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    roles: {
      target: "Role",
      type: "many-to-many",
      mappedBy: "permissions", // inverse of Role's permissions relation
    },
  },
});

module.exports = { Permission };
