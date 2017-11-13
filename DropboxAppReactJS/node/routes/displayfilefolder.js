var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var kafka = require('./kafka/client');
var mongo = require("./mongo");

router.get('/getfilefolder', function (req, res, next) {


    var listDirParams = { parentfolder: req.query.currentfolder, isGroup:null };
    kafka.make_request('getFileDir_topic',listDirParams, function(err,results){
        console.log(results);
        if(err){
            console.log("list dir error");
            throw err;
        }
        else
        {
            if(results.code == 200){
                //req.session.user = results.username;
                // req.session.username = results.user.username;
                //console.log(JSON.stringify(results));
                 //return res.status(200).send({list: results.list});
                return res.status(200).send({list:results.list});

            }
            else {
                res.status(204).send({error:"error"});
            }
        }
       // return res.status(200).send(JSON.stringify(results.list));
    });

});


router.get('/getGroupfile', function (req, res, next) {


    var listDirParams = { parentfolder: req.query.currentfolder, isGroup:true };
    kafka.make_request('getFileDir_topic',listDirParams, function(err,results){
        console.log(results);
        if(err){
            console.log("list dir error");
            throw err;
        }
        else
        {
            if(results.code == 200){
                //req.session.user = results.username;
                // req.session.username = results.user.username;
                //console.log(JSON.stringify(results));
                //return res.status(200).send({list: results.list});
                return res.status(200).send({list:results.list});

            }
            else {
                res.status(204).send({error:"error"});
            }
        }
        // return res.status(200).send(JSON.stringify(results.list));
    });

});

router.get('/getsharedfilefolder', function (req, res, next) {
    var mongoURL = "mongodb://localhost:27017/AppDropbox";
    // MongoClient.connect(mongoURL, function(err, db) {
    //
    //     if (err) throw err;

        var query = {sharedtouser: req.query.username};
        mongo.collection("shareinfo").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("shared file query result"+JSON.stringify(result));
            mongo.returnConnection();
            if(result.length>0) {
                // console.log(result[0].path.replace("public/uploads/", ""));
                // var query = {path: result[0].path};
                // mongo.collection("filedirectoryinfo").find(query).toArray(function (err, result) {
                //     if (err) throw err;
                //     mongo.returnConnection()
                //     console.log("query result" + JSON.stringify(result));
                //     //db.close();
                //     return res.status(200).send(JSON.stringify(result));
                // });
                return res.status(200).send(JSON.stringify(result));
            }
            else {
                // db.close();
                return res.status(401).send(JSON.stringify(result));
            }
        });

    //});


});

module.exports = router;