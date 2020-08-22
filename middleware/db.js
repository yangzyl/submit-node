//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : '118.31.6.0',
user     : 'root',
password : 'Ruan410093793.',
database : 'account'
});
//执行创建连接 
connection.connect();
module.exports = connection;