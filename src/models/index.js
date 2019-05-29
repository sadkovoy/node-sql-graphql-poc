const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const { default: dataLoaderSequelize } = require('dataloader-sequelize');
const sequelizePaginate = require('sequelize-paginate');

const basename = path.basename(__filename);
const config = require(__dirname + '/../../config.js');
const db = {};

const sequelize = new Sequelize(
  config.db.database, config.db.username, config.db.password, config.db.options,
);

const models = [];
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
    models.push(model);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

models.forEach(model => {
  sequelizePaginate.paginate(model);
  dataLoaderSequelize(model);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
