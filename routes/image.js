var express = require('express');
var formidable = require('formidable'); //上传功能的插件
var path = require('path')
var fs = require("fs");
var router = express.Router();
router.post('/', (req, res, next) => {
    //上传文件只能通过这个插件接收  file是上传文件 fields是其他的
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../static/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
    form.keepExtensions = true; //使用文件的原扩展名  
    form.parse(req, function (err, fields, file) {
      var filePath = '';
      //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
      if (file.tmpFile) {
        filePath = file.tmpFile.path;
      } else {
        for (var key in file) {
          if (file[key].path && filePath === '') {
            filePath = file[key].path;
            break;
          }
        }
      }
      //文件移动的目录文件夹，不存在时创建目标文件夹  
      var targetDir = path.join(__dirname, '../static/uploads');
      if (!fs.existsSync(targetDir)) {
        fs.mkdir(targetDir);
      }
      var fileExt = filePath.substring(filePath.lastIndexOf('.'));
      //判断文件类型是否允许上传  
      if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
        var err = new Error('此文件类型不允许上传');
        res.send({
            status: 99,
            statusText: '此文件类型不允许上传',
            data: null,
        });
      } else {
        //以当前时间戳对上传文件进行重命名  
        var fileName = new Date().getTime() + fileExt;
        var targetFile = path.join(targetDir, fileName);
        //移动文件  
        fs.rename(filePath, targetFile, function (err) {
          if (err) {
            res.send({
                status: 99,
                statusText: '上传图片失败',
                data: null,
            });
          } else {
            
            res.send({
                status: 0,
                statusText: '',
                data: {
                    fileName
                },
            });    
          }
        });
      }
    });
  })

module.exports = router;