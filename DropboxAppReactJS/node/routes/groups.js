var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
const del = require('del');
var MongoClient = require('mongodb').MongoClient;
var mongo = require("./mongo");


var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));


router.get('/',function (req,res) {
    // req.session.username = "Jainul";
    //res.send("Session"+req.session.username);
});

router.post('/createGroup', function (req,res) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";

    console.log("Directory name" + req.session.user);
    console.log("Group name" + req.body.groupName);
    console.log("current Directory name" + req.body.currentfolder);

    var fullpath = "public/uploads/" + req.body.currentfolder + "/" + req.body.dirName;
    // MongoClient.connect(mongoURL, function (err, db) {
    //     if (err) throw err;
        var groupObj = {
            "groupName": req.body.groupName,
            "createdBy": req.body.username,
            "member": req.body.member
        };
        mongo.collection("groups").insertOne(groupObj, function (err, res3) {
            if (err) throw err;
            console.log("1 group inserted");
            mongo.returnConnection();
            mkdirp('./public/uploads/' + req.body.username + "/" + req.body.groupName, function (err) {
                if (!err) {

                    var fullpath = "public/uploads/" + req.body.currentfolder + "/" + req.body.groupName;
                    // MongoClient.connect(mongoURL, function (err, db) {
                    //     if (err) throw err;
                        var dirObj = {
                            "username": req.body.username,
                            "parentfolder": req.body.currentfolder,
                            "filefoldername": req.body.groupName,
                            "path": fullpath,
                            "isDir": true,
                            "isStar": false,
                            "isGroup": true
                        };
                        mongo.collection("filedirectoryinfo").find(dirObj).toArray(function (err, result) {
                            if (err) throw err;
                            console.log("session" + req.session.user);
                            console.log("query result" + JSON.stringify(result));
                            mongo.returnConnection();

                            if (result.length > 0) {
                                console.log("folder already exists");
                            } else {
                                mongo.collection("filedirectoryinfo").insertOne(dirObj, function (err, res1) {
                                    if (err) throw err;
                                    console.log("1 document inserted");
                                    mongo.returnConnection();

                                });
                                var eventObj = {
                                    "username": req.body.username,
                                    "parentfolder": req.body.currentfolder,
                                    "foldername": req.body.groupName,
                                    "event": "created group ",
                                    "time": Date(dt.now())

                                };
                                mongo.collection("userevents").insertOne(eventObj, function (err, res2) {
                                    if (err) throw err;
                                    mongo.returnConnection();
                                    console.log("1 document inserted");
                                    res.status(204).end();
                                });

                            }


                        });



                    //});


                }


            });



        });
        res.status(204).end();
    //});
});

router.get('/getGroups', function (req, res, next) {
    var resArr = [];
    var mongoURL = "mongodb://localhost:27017/AppDropbox";
    MongoClient.connect(mongoURL, function(err, db) {

        if (err) throw err;

        var query = {member: req.query.username};
        db.collection("groups").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("query result"+JSON.stringify(result));
           // db.close();
            return res.status(200).send(JSON.stringify(result));
        });

    });

});


router.get('/getMembers', function (req, res, next) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";
    MongoClient.connect(mongoURL, function(err, db) {

        if (err) throw err;

        var query = {groupName: req.query.groupname};
        db.collection("groups").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log("sessionOOOOOO"+ req.session.user);
            console.log("query result"+JSON.stringify(result));
            db.close();
            return res.status(200).send(JSON.stringify(result));
        });

    });

});


router.post('/addMember', function (req,res) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";

    console.log("user name"+req.session.username);
    console.log("Group name"+req.body.groupName);
    console.log("current Directory name"+req.body.currentfolder);

    var fullpath = "public/uploads/" +req.body.currentfolder + "/"+req.body.dirName;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var groupObj = {
            "groupName": req.body.groupName,
            "createdBy": req.body.username,
            "member":req.body.member
        };
        db.collection("groups").insertOne(groupObj, function (err, res) {
            if (err) throw err;
            console.log("1 group inserted");
            db.close();

        });


    });
    res.status(204).end();


});

router.get('/deleteMember', function (req, res, next) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";
    MongoClient.connect(mongoURL, function(err, db) {

        if (err) throw err;

        var query = {groupName: req.query.groupname, member: req.query.memberName};
        db.collection("groups").deleteMany(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            console.log("documents deleted");
        });
    res.status(204).end();

    });

});

router.get('/deleteGroup', function (req, res, next) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";
    MongoClient.connect(mongoURL, function(err, db) {

        if (err) throw err;

        var query = {groupName: req.query.groupname};
        db.collection("groups").deleteMany(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            console.log("documents deleted");
        });
        var query1 = {groupname: req.query.groupname};
        db.collection("filedirectoryinfo").deleteMany(query1, function(err, result) {
            if (err) throw err;
            console.log(result);
            console.log("documents deleted");
        });
        res.status(204).end();

    });

});

module.exports = router;