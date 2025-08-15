const { EntitySchema } = require("typeorm");

const Teacher = new EntitySchema({
  name: "Teacher",
  tableName: "teachers",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    role: {
      target: "Role", 
      type: "many-to-one",
     
      joinColumn: {
        name: "role_id", // foreign key in teachers table
      },
      eager: true,
    },
  },
});

module.exports = { Teacher };
