
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USER || "root",
    password: env.DB_PASSWORD || "",
    database: env.DB_NAME || "fintrackr",
    host: env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: env.DB_USER || "root",
    password: env.DB_PASSWORD || "",
    database: env.DB_NAME_TEST || "fintrackr_test",
    host: env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: env.DB_USER || "root",
    password: env.DB_PASSWORD || "",
    database: env.DB_NAME || "fintrackr",
    host: env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
};
 
