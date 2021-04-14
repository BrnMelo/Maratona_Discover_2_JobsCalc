const sqlite3 = require('sqlite3');
// js permite que usando as '{}' possamos
//ir dentro do
//sqlite e pegar apenas a funcionalidade chamada
const { open } = require('sqlite');

module.exports = () => open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
