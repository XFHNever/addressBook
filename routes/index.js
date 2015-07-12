var express = require('express');
var fs = require('fs');
var json2csv = require('json2csv');
var nodeExcel = require('excel-export');
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
  res.redirect('/');
});

router.get('/download', function(req, res, next) {
  //Student.find(function (err, students) {
  //  if(err) {
  //    res.send(err);
  //  }
  //
  //  var fields = ['Id', 'Name', 'Phone', 'QQ', 'Wechat', 'Email', 'City', 'Enterprise'];
  //
  //  json2csv({ data: students, fields: fields }, function(err, csv) {
  //    if (err) console.log(err);
  //
  //    fs.writeFile('addressBook.csv', csv, function(err) {
  //      if (err) throw err;
  //      console.log('file saved');
  //    });
  //    res.send(csv);
  //  });
  //
  //  //res.render('index', {students: students});
  //});
  //var conf ={};
  //conf.cols = [
  //  {caption:'string', type:'string'},
  //  {caption:'date', type:'date'},
  //  {caption:'bool', type:'bool'},
  //  {caption:'number', type:'number'}
  //];
  //conf.rows = [
  //  ['pi', (new Date(2013, 4, 1)).getJulian(), true, 3.14],
  //  ["e", (new Date(2012, 4, 1)).getJulian(), false, 2.7182]
  //];
  //var result = nodeExcel.execute(conf);
  //res.setHeader('Content-Type', 'application/vnd.openxmslformats');
  //res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  //res.send(result, 'binary');


});

router.get('/delete/:id', function(req, res, next) {
  Student.findByIdAndRemove(req.params.id, function(err) {
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
  res.redirect('/');
});

module.exports = router;
