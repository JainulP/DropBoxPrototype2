var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));
var mongo = require("./mongo");

router.post('/upload', function (req, res, next) {


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/'+req.query.currentfolder+"/")
        },
        filename: function (req, file, cb) {
            cb(null,  file.originalname)
        }
    });

    var uploadfile = multer({storage:storage}).single('myfile');
    //
    uploadfile(req,res,function (err) {
        if(err){console.log(err);}
        else {

            console.log(req.file);
            var stats = fs.statSync(req.file.path);

            var stats = fs.statSync(req.file.path);

            var mongoURL = "mongodb://localhost:27017/AppDropbox";
            // MongoClient.connect(mongoURL, function(err, db) {
            //     if (err) {
            //         console.log("errorr is here");
            //         throw err
            //     };
                if(req.query.groupname == "null") {
                    var fileObj = {
                        "username": req.session.user,
                        "parentfolder": req.query.currentfolder,
                        "filefoldername": req.file.originalname,
                        "path": req.file.path,
                        "isDir": stats.isDirectory(),
                        "isStar": false,
                    };
                }
                else
                {
                    var fileObj = {
                        "username": req.session.user,
                        "parentfolder": req.query.currentfolder,
                        "filefoldername": req.file.originalname,
                        "path": req.file.path,
                        "isDir": stats.isDirectory(),
                        "isStar": false,
                        "groupname": req.query.groupname,
                        "isGroup": true
                    };
                }
                mongo.collection("filedirectoryinfo").find(fileObj).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("session"+ req.session.user);
                    console.log("query result"+JSON.stringify(result));
                    mongo.returnConnection();

                    if(result.length >0)
                    {
                        console.log("file already exists");

                    }else
                    {
                        mongo.collection("filedirectoryinfo").insertOne(fileObj, function (err, res) {
                            if (err) throw err;
                            console.log("1 upload document inserted to filedirectoryinfo");
                            mongo.returnConnection();

                        });
                        var eventObj = {
                            "username": req.session.user,
                            "parentfolder": req.query.currentfolder,
                            "foldername": req.file.originalname,
                            "event": "uploaded",
                            "time": Date(dt.now())

                        };
                        mongo.collection("userevents").insertOne(eventObj, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            mongo.returnConnection();

                        });

                        res.status(204).end();

                    }
                    // db.close();
                    // return res.status(200).send(JSON.stringify(result));
                });

               // db.close();

           // });



        }
    });
//     // console.log(multer({storage:storage}).single('myfile'));
//     console.log(req.query.currentfolder);

//     console.log(req.payloads);
//     console.log(req);
//     var uploadFileParams = { currentfolder: req.query.currentfolder, storage:storage};
//     kafka.make_request('fileupload_topic',uploadFileParams, function(err,results){
//         console.log(results);
//         if(err){
//             console.log("file upload error");
//             throw err;
//         }
//         else
//         {
//             if(results.code == 200){
//
//                 // req.session.username = results.user.username;
//                 console.log(JSON.stringify(results));
//                 //return res.status(200).send({list: results.list});
//                 return res.status(200).end();
//
//             }
//             else {
//                 res.status(204).end();
//             }
//         }
//         // return res.status(200).send(JSON.stringify(results.list));
//     });

});

module.exports = router;