var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var kafka = require('./kafka/client');

router.post('/sharefiledir', function (req, res, next) {
    // var resArr = [];
    // var mongoURL = "mongodb://localhost:27017/AppDropbox";
    // MongoClient.connect(mongoURL, function(err, db) {
    //
    //     if (err) throw err;
    //     console.log(" path : "+req.body.shareDirectoryPath);
    //     console.log("sharedwith:" +req.body.shareWith);
    //     console.log(req.body.shareDirectoryPath.split('/')[2]);
    //     var query = {sharedbyuser: req.body.shareDirectoryPath.split('/')[2] , sharedtouser: req.body.shareWith, path:req.body.shareDirectoryPath };
    //     db.collection("shareinfo").insertOne(query,function (err,res) {
    //         if (err) {
    //             console.log("error with shareinfo");
    //             throw  err;
    //         }
    //         console.log("shareinfo inserted");
    //         db.close();
    //
    //     });
    //
    // });
    // res.status(204).end();



    var shareFileParams = { sharedbyuser: req.session.user, sharedtouser: req.body.shareWith,path: req.body.shareDirectoryPath, filefoldername: req.body.filefoldername, isDir:req.body.isDir };
    kafka.make_request('sharefile_topic',shareFileParams, function(err,results){
        console.log(results);
        if(err){
            console.log("share file error");
            throw err;
        }
        else
        {
            if(results.code == 200){
                return res.status(200).end();

            }
            else {
                res.status(204).end();
            }
        }
        // return res.status(200).send(JSON.stringify(results.list));
    });

});

module.exports = router;

