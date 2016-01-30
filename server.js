var express = require('express');
var bodyParser = require("body-parser");

var app = express();

//app.use(express.static(__dirname + '/Mobile/Billionaire'));//build/production/Billionaire

app.use(express.static(__dirname + '/Mobile/Billionaire/build/production/Billionaire'));
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

var server = app.listen(3021, function () {
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/login', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");

    var username = req.body["username"];
    var password = req.body["password"];
    console.log([
        'Device name: ' + req.body["Device_Name"],
        'Device platform: ' + req.body["Device_Platform"],
        'Device UUID: ' + req.body["Device_UUID"],
        'Username: ' + username
    ].join('\n'));
    mongoose.model('Users').findOne({ Username: username, Password: password }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(200).send(JSON.stringify({ Status: "failure", Message: "Incorrect Username or Password", "success": true }));
        }
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: JSON.stringify(user) }));
    });
});

app.post('/addTicket', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    console.log('Add ticket request made');
    console.log(req.body['formData']);

    var Tickets = mongoose.model('Tickets'),
        data = JSON.parse(req.body['formData']);
   /* db.getCollection('tickets').find({
        $and: [{ "FourDNumber": { $in: ["3333", "9060", "9061", "4562"] } },
            { "PhoneNumber": "586431" },
            {
                "ModifiedOn": {
                    "$gte" : ISODate("2016-01-17T00:00:00Z"), 
                    "$lt" : ISODate("2016-01-19T00:00:00Z")
                }
            }]
    })*/
  /*  var fourDs = data.map(function (item) {
        return item.FourDNumber.toString();
    });
    Tickets.find({
        $and: [{ "FourDNumber": { $in: fourDs } }, { "PhoneNumber": data[0].PhoneNumber }, {
                "ModifiedOn": {
                    "$gte" : new Date(new Date().toLocaleDateString()), 
                    "$lt" : new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString())
                }
            }]
    }, function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        else {
            if (docs.length > 0) {
                console.log('already exists:');
                return res.status(200).send(JSON.stringify(docs));
            }
        }
    });*/
    
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
            ContestDate: doc["ContestDate"],
            CreatedOn: Date.now(),
            CreatedBy: doc["CreatedBy"],//req.body["CreatedBy"],
            ModifiedOn: Date.now(),
            ModifiedBy: doc["ModifiedBy"],//req.body["ModifiedOn"],
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

app.get('/lsorders', function (req, res) {
    console.log('/lsorders req made');
    res.header('Access-Control-Allow-Origin', "*");
    var params = [];
    var searchQry = {};
    
    if (req.query['simpleValue']) {   // Quick free search
        params.push({ 'PhoneNumber' : new RegExp('.*' + req.query['simpleValue'] + '.*') });
        params.push({ 'FourDNumber' : new RegExp('.*' + req.query['simpleValue'] + '.*') });

        searchQry['$or'] = params;
    }
    
    if (req.query['IsSuperAdmin'] == "false")
        searchQry['$and'] = [{ CreatedBy: req.query['UserId'] }];
    
    if (req.query['ByUsernameValue']) { 
        searchQry['$and'] = [{ CreatedBy: req.query['ByUsernameValue'] }];
    }
    // $or: params, $and: [{ CreatedBy: "1" }]
    mongoose.model('Tickets').find(searchQry).sort({ ContestDate: 'desc' }).exec(function (err, orders) {
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


app.get('/lsusers', function (req, res) {
    console.log('/lsusers req made');
    res.header('Access-Control-Allow-Origin', "*");
    var params = [];
   
    
    
    // $or: params, $and: [{ CreatedBy: "1" }]
    mongoose.model('Users').find({}, function (err, users) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!users) {
            return res.status(200).send(JSON.stringify({ Status: "failure", Message: "Failed to load", "success": true }));
        }
        
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: users }));
    });
});