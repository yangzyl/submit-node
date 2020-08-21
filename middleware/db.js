//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : '106.12.146.146',
user     : 'root',
password : '15963383124',
database : 'submit'
});
//执行创建连接 
connection.connect();
module.exports = connection;