var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require("fs");
router.get(/.*/, function(req, res, next) {
    //解析请求参数
    var filename = req.url.split('/')[req.url.split('/').length-1];
    var suffix = req.url.split('.')[req.url.split('.').length-1];
    if(['gif', 'jpeg', 'jpg', 'png'].indexOf(suffix) !== -1) {
        res.writeHead(200, {'Content-Type': 'image/'+suffix});
        res.end(get_file_content(path.join(__dirname, '../static/uploads', filename)));
    } else {
        res.send({
              status: 99,
              statusText: '图片读取失败',
              data: null,
          });
    }
    // const body = req.body;
    //   var addSqlParams = [uuid.v4(), body.username, body.cardType, body.cardnum, body.agencynum, body.phonenum, body.imageUrl, new Date()];
      
    //   //增
    // connection.query(addSql,addSqlParams,function (err, result) {
    //     if(err){
    //         console.log(err)
    //       res.send({
    //           status: 99,
    //           statusText: '插入用户失败',
    //           data: null,
    //       });
    //      return;
    //     }  
    //     res.send({
    //         status: 0,
    //         statusText: '',
    //         data: null,
    //     });           
    // });
});
function get_file_content(filepath){
    return fs.readFileSync(filepath);
}

module.exports = router;
