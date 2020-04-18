require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.dbpassword,
    database: "dogwalk",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "a5oh8tet865dk75z",
    password: process.env.herokupassword,
    database: "database_production",
    host: "	i2cpbxbi4neiupid.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
  }
};
