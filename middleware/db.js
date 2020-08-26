//加载mysql模块
var mysql = require('mysql');

var config = {
    host     : '118.31.6.0',
    user     : 'root',
    password : 'Ruan410093793.',
    database : 'account'
}

function handleError (err) {
    if (err) {
      // 如果是连接断开，自动重新连接
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connect();
      } else {
        console.error(err.stack || err);
      }
    }
  }
  
  // 连接数据库
  function connect () {
    db = mysql.createConnection(config);
    db.connect(handleError);
    db.on('error', handleError);
  }

var cnt=0;
var time = 10 * 60 * 1000;
var  getUserSql = 'SELECT * from user';
var conn=function(){
    db.query(getUserSql, function (error, results, fields) {
      if (error) throw error;
    });
    cnt++;
    console.log("Mysql重连接成功! 次数:"+cnt);
}
setInterval(conn, time);
  
var db;
connect();
module.exports = db;