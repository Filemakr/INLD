var mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({

   host:'idlcdatabase-do-user-8079481-0.b.db.ondigitalocean.com',
  ///host : 'localhost',
   user: 'doadmin',
  password:'zrfsltih9so8u9zk',
  // password : '123',
    database: 'political_frames',
    port:'25060' ,
    multipleStatements: true
  })


module.exports = pool;
