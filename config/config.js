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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
