var uuid  = require ('node-uuid');
var express = require('express');
var router = express.Router();
 var URL = require('url');
 var connection = require('../middleware/db')
//SQL语句
var  addSql = 'INSERT INTO user(id,username,cart_type,cart_code, agency_code, tel_phone, image, image_back, image_bank, image_bank_back, bank_count, bank_info, create_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
router.post('/user', function(req, res, next) {
    //解析请求参数
    const body = req.body;
      var addSqlParams = [uuid.v4(), body.username, body.cardType, body.cardnum, body.agencynum, body.phonenum, body.imageUrl, body.imageUrlBack, body.imageUrlBank, body.imageUrlBankBack, body.bankcount, body.bankinfo, new Date()];
      
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
var  addPriceSql = 'INSERT INTO account(id,account, username,price_type, price, create_time) VALUES(?,?,?,?,?,?)';
var  addAccountSql = 'INSERT INTO account(id, account, username,price_type,bank_acount, bank_info , price, create_time) VALUES(?,?,?,?,?,?,?,?)';
router.post('/price', function(req, res, next) {
    //解析请求参数
    const body = req.body;
    var sql;
    var params;
    if (body.workChoice == '线下入金') {
        sql = addPriceSql;
        params =  [uuid.v4(), body.account, body.username, body.workChoice, body.orderCount, new Date()];
    } else {
        sql = addAccountSql;
        params =  [uuid.v4(), body.account, body.username, body.workChoice, body.bankcount, body.bankinfo, body.orderCount, new Date()];
    }
      
      //增
    connection.query(sql,params,function (err, result) {
        if(err){
          res.send({
              status: 99,
              statusText: '插入数据失败',
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
