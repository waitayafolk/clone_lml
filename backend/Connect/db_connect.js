require('dotenv').config()
const { Pool } = require("pg");
var moment = require("moment");
const types = require("pg").types;
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USERNAME,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    max: 10,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
});

pool.on("connect", (client) => {
  console.log(
    `TotalCount On Connect: ${pool.totalCount}, IdleCount On Connect: ${pool.idleCount}, WaitingCount On Connect: ${pool.waitingCount}`
  );
});

pool.on("acquire", (client) => {

});

pool.on("error", (err, client) => {
  if (err) {
    console.log(`Connection Pool On Error`, err.message, err.stack);
    process.exit(0);
  }
});

pool.on("remove", (client) => { });

var parseFn = function (val) {
  return val === null ? null : moment(val);
};
types.setTypeParser(types.builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(types.builtins.TIMESTAMP, parseFn);

types.setTypeParser(types.builtins.FLOAT8, (value) => {
  return parseFloat(value);
});
types.setTypeParser(types.builtins.NUMERIC, (value) => {
  return parseFloat(value);
});
types.setTypeParser(20, BigInt);

types.setTypeParser(20, (val) => {
  return parseInt(val);
});

module.exports = pool;
