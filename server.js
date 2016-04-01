var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var json2xls = require('json2xls');
var app = express();


app.use(cookieParser());
app.use(expressSession({ secret:'Xjns73SJdie', resave: false, saveUninitialized: true, cookie: { secure: false, maxAge: 1800000 } }));

app.use(express.static(__dirname + '/Mobile/Billionaire'));//build/production/Billionaire

//app.use(express.static(__dirname + '/Mobile/Billionaire/build/production/Billionaire'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(json2xls.middleware);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BillionaireDB');
//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert'),
    fs = require('fs'),
    pdf = require('html-pdf'),
    path = require('path');


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

app.get('/', function (req, res) {
    if (req.session.username) {
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: JSON.stringify(user) }));
    }
});

app.get('/getStatus', function (req, res) {
    if (req.session.username) {
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: JSON.stringify(req.session) }));
    }
    else
        return res.status(200).send(JSON.stringify({ Status: "success", "success": false }));
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
        req.session.isSuperAdmin = user._doc.isSuperAdmin;
        req.session.userID = user._id;
        req.session.username = user._doc.Username;
        return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: JSON.stringify(user) }));
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
            IsIBox: doc["IsIBox"],
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
    if (!req.session.username)
        return false;
    console.log('/lsorders req made');
    res.header('Access-Control-Allow-Origin', "*");
    var params = [];
    var searchQry = {};
    
    if (req.query['simpleValue']) {   // Quick free search
        params.push({ 'PhoneNumber' : new RegExp('.*' + req.query['simpleValue'] + '.*') });
        params.push({ 'FourDNumber' : new RegExp('.*' + req.query['simpleValue'] + '.*') });

        searchQry['$or'] = params;
    }
    if (!req.session.isSuperAdmin) {
        //if (req.query['IsSuperAdmin'] == "false") {
            if (!searchQry['$and'])
                searchQry['$and'] = [];
            searchQry['$and'].push({ CreatedBy: req.session.userID });
        //}
    }
    if (req.query['ByUsernameValue']) {
        if (!searchQry['$and'])
            searchQry['$and'] = [];
        searchQry['$and'].push({ CreatedBy: req.query['ByUsernameValue'] });
    }
    
    if (req.query['ByContestDate']) {
        if (!searchQry['$and'])
            searchQry['$and'] = [];
        searchQry['$and'].push({
            ContestDate: {
                "$gte" : new Date(req.query['ByContestDate']).toISOString(),
                "$lt" : new Date(new Date(req.query['ByContestDate']).setDate(new Date(req.query['ByContestDate']).getDate() + 1)).toISOString()
            }
        });
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
        if (req.query['isExport']) {
            var html = fs.readFileSync('./report/orderrpt_template.html', 'utf8');
            var options = { format: 'Letter' };
            //res.header('Content-Type', "application/xlsx");
            res.header('Content-Type', "application/pdf");
            res.header('Content-Disposition', 'attachment');
            pdf.create(html, options).toFile('report/businesscard.pdf', function (err, resp) {
                if (err) return console.log(err);
                console.log(resp);
                res.sendFile(path.join(__dirname + '/report/businesscard.pdf'));
                // { filename: '/app/businesscard.pdf' } 
            });
            //res.xls('11000.xlsx', ordersforExport(orders));
        }
        else { 
            return res.status(200).send(JSON.stringify({ Status: "success", "success": true, data: orders }));
        }
    });
});

ordersforExport = function (orders) {
    var jsonData = [];
    for (var i = 0; i < orders.length; i++) {
        var rec = {};
        rec['FourDNumber'] = orders[i]['FourDNumber'] +'-'+ orders[i]['Sub1'] + '-' + orders[i]['Sub2'];
        rec['Company'] = orders[i]['Company'].map(function (item) {
            return item == 1 ? 'M' : item == 2 ?'K' : 'T';
        }).join(',');
        rec['Total'] = (parseInt(orders[i]['Sub1']) + parseInt(orders[i]['Sub2'])) * orders[i]['Company'].length;
        rec['Phone Number'] = orders[i]['PhoneNumber'];
        rec['Contest Date'] = orders[i]['ContestDate'];
        rec['Record Created On'] = orders[i]['CreatedOn'];
        rec['Modified By'] = orders[i]["ModifiedBy"];
        jsonData.push(rec);
    }

    return jsonData;
}

getCompaniesFromValues  = function (values) {
    var cmpnyArray = [];
    if (values.M) cmpnyArray.push(1);
    if (values.K) cmpnyArray.push(2);
    if (values.T) cmpnyArray.push(3);
    
    return cmpnyArray;
},

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