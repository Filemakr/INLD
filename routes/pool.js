var mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({

   host:'db-mysql-blr1-35944-do-user-8703439-0.b.db.ondigitalocean.com',
  ///host : 'localhost',
   user: 'doadmin',
  password:'r5c1d14p7xg6e2sr',
  // password : '123',
    database: 'political_frames',
    port:'25060' ,
    multipleStatements: true
  })


module.exports = pool;
