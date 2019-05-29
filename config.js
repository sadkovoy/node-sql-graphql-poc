module.exports = {
  db: {
    database: 'database',
    username: 'user',
    password: 'password',
    options: {
      host: 'mysql',
      port: 3306,
      dialect: 'mysql',
      logging: console.log,
    }
  }
};
