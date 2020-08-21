var uuid  = require ('node-uuid');
var express = require('express');
var router = express.Router();
 var URL = require('url');
 var connection = require('../middleware/db')
//SQL语句
var  addSql = 'INSERT INTO user(id,username,cart_type,cart_code, agency_code, tel_phone, image, create_time) VALUES(?,?,?,?,?,?,?,?)';
router.post('/user', function(req, res, next) {
    //解析请求参数
    const body = req.body;
      var addSqlParams = [uuid.v4(), body.username, body.cardType, body.cardnum, body.agencynum, body.phonenum, body.imageUrl, new Date()];
      
      //增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log(err)
          res.send({
              status: 99,
              statusText: '插入用户失败',
              data: null,
          });
         return;
        }
        res.send({
            status: 0,
            statusText: '',
            data: null,
        });           
    });
});

module.exports = router;
