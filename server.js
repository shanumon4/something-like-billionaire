var express = require('express');
var bodyParser = require("body-parser");

var app = express();

//app.use(express.static(__dirname + '/Mobile/Billionaire'));//build/production/LottMobile
app.use(express.static(__dirname + '/Mobile/Billionaire'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BillionaireDB');
//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert'),
    fs = require('fs');

var server = app.listen(3030, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Billionaire listening at http://%s:%s', host, port);
});

fs.readdirSync(__dirname + '/model').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/model/' + filename)
});

//var Users = require('model/Users');
app.get('/Billionaire-Mobile', function (req, res) {
    res.sendFile('index.html', {
        root: 'Mobile/Billionaire' //build/production/Billionaire
    });
});



app.post('/login', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");

    var username = req.body["username"];
    var password = req.body["password"];
    console.log(username);
    mongoose.model('Users').findOne({ Username: username, Password: password }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(200).send(JSON.stringify({ Status: "failure", Message: "Incorrect Username or Password", "success": true }));
        }
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true }));
    });
});

app.post('/addTicket', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    console.log('Add ticket request made');
    console.log(req.body['formData']);
    var Tickets = mongoose.model('Tickets'),
        data = JSON.parse(req.body['formData']);
    
    
    var total = data.length, result = [];

    function saveAll() {
        
        var doc = data.pop();

        var ticket = new Tickets({
            Id: 1111,//req.body["Id"],
            FourDNumber: doc["FourDNumber"],
            Sub1: doc["Sub1"],
            Sub2: doc["Sub2"],
            Company: doc["Company"],
            PhoneNumber: doc["PhoneNumber"],
            SMSStatus: 0,//req.body["SMSStatus"],
            CreatedOn: Date.now(),
            CreatedBy: 1,//req.body["CreatedBy"],
            ModifiedOn: Date.now(),
            ModifiedBy: 1,//req.body["ModifiedOn"],
            IsDeleted: 0
        });
        console.log(ticket);
        ticket.save(function (err, saved) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            result.push(saved);
            console.log('saved:' + saved);
            if (--total) saveAll();
            else {
                console.log('result:' + JSON.stringify(result));
                return res.status(200).send(JSON.stringify(result));
            }
        });
    }

    saveAll();


    //console.log(ticket);
    //ticket.save(function (err, savedUser) {
    //    if (err) {
    //        console.log(err);
    //        return res.status(500).send();
    //    }
    //    return res.status(200).send();
    //});

});


app.post('/lsorders', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    var params= {};
    if (req.body['mode'] == 1) {   // Quick free search
        params['PhoneNumber'] = '/.*' + req.body['value'] +'.*/';
        params['FourDNumber'] = '/.*' + req.body['value'] +'.*/';
    }
    //$or: [{ '_id': objId }, { 'name': param }, { 'nickname': param }]
    mongoose.model('Tickets').find({ $or: [params] }, function (err, orders) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!orders) {
            return res.status(200).send(JSON.stringify({ Status: "failure", Message: "Failed to load", "success": true }));
        }
        
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: orders }));
    });
});