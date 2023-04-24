const { Pool } = require('pg')

const INSERT_YOUR_POSTGRES_URL_HERE = "postgres://lickrppk:z_h6DUwHN7qR5gMPvn4_MBVCP7TRLMOI@babar.db.elephantsql.com/lickrppk";
var connectionString = INSERT_YOUR_POSTGRES_URL_HERE 

const pool = new Pool({
  connectionString,
})
 
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

