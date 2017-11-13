var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var kafka = require('./kafka/client');
var fs = require('fs');
const del = require('del');
var mongoURL = "mongodb://localhost:27017/AppDropbox";
var mongo = require("./mongo");

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));

router.get('/deletefile', function (req, res, next) {
        var deleteFileParams = { path: req.query.filePath};
        kafka.make_request('delete_topic',deleteFileParams, function(err,results){
            //console.log(results);
            if(err){
                console.log("delete dir error");
                throw err;
            }
            else
            {
                if(results.code == 200) {
                    console.log("delete dir success");

                     // MongoClient.connect(mongoURL, function(err, db) {
                     //     if (err) throw err;

                         var eventObj = {
                             "username": req.session.user,
                             "parentfolder": req.query.currentfolder,
                             "foldername": req.query.filePath,
                             "event": "deleted",
                             "time": Date(dt.now())

                         };
                         mongo.collection("userevents").insertOne(eventObj, function (err, res) {
                             if (err) throw err;
                             mongo.returnConnection();
                         });
                     //});
                    return res.status(200).end();

                }
                else {
                    res.status(204).end();
                }
            }

        });

});


module.exports = router;