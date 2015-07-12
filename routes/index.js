var express = require('express');
var fs = require('fs');
var json2csv = require('json2csv');
var router = express.Router();
var Student = require('../models/student');

var id = 1

/* GET home page. */
router.get('/', function(req, res, next) {
  Student.find(function (err, students) {
    if(err) {
      res.send(err);
    }
    res.render('index', {students: students});
  });
});
router.post('/create', function(req, res, next) {

  var student = new Student();
  student.id = id++;
  student.name = req.body.name;
  student.phone = req.body.phone;
  student.qq = req.body.qq;
  student.wechat = req.body.wechat;
  student.email = req.body.email;
  student.city = req.body.city;
  student.enterprise = req.body.enterprise;

  student.save(function(err, createdStudent) {
    if(err) {
      res.send(err);
    }
    Student.find(function (err, students) {
      if(err) {
        res.send(err);
      }
      res.render('index', { students: students});
    });
  });
});

router.post('/download', function(req, res, next) {
  Student.find(function (err, students) {
    if(err) {
      res.send(err);
    }

    var fields = ['Id', 'Name', 'Phone', 'QQ', 'Wechat', 'Email', 'City', 'Enterprise'];

    json2csv({ data: students, fields: fields }, function(err, csv) {
      if (err) console.log(err);

      fs.writeFile('addressBook.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
      });
      res.send(csv);
    });

    //res.render('index', {students: students});
  });


});

module.exports = router;
