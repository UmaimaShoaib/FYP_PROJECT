const typeorm = require("typeorm");
const { Teacher } = require('../entities/entity');
const  {Permission}  = require("../entities/permission");
const { Role } = require("../entities/role"); // role ko import karo
require('dotenv').config();

const dataSource = new typeorm.DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Teacher, Permission, Role], // sab entities include karo
});

module.exports = dataSource;
