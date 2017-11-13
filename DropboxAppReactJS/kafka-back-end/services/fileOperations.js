var mongo = require("./mongo");
// var mongoURL = "mongodb://localhost:27017/AppDropbox";
// var MongoClient = require('mongodb').MongoClient;
var mkdirp = require('mkdirp');
var multer = require('multer');
var fs = require('fs');
const del = require('del');


var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));


function uploadFile(msg, callback){

    var response = {};

    try {
console.log(msg);
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/uploads/'+msg.currentfolder+"/")
            },
            filename: function (req, file, cb) {
                cb(null,  file.originalname)
            }
        });

        var uploadfile = multer({storage:storage}).single('myfile');

        uploadfile(req,res,function (err) {
            if(err){console.log(err);}
            else {
                // var fullpath = "public/uploads/" +req.body.currentfolder + "/"+req.body.dirName;

                console.log(msg.file);
                var stats = fs.statSync(msg.file.path);
                console.log('is Directory ? ' + stats.isDirectory());
                var stats = fs.statSync(msg.file.path);
                console.log("current folder"+msg.currentfolder);
                console.log("original filename"+msg.file.originalname);
                console.log("username"+msg.currentfolder.split('/')[0]);
                console.log("groupname"+msg.currentfolder.split('/')[0]);

                // var mongoURL = "mongodb://localhost:27017/AppDropbox";
                // MongoClient.connect(mongoURL, function(err, db) {
                //     if (err) {
                //         console.log("errorr is here");
                //         throw err
                //     };
                    var fileObj = {
                        "username": msg.currentfolder.split('/')[0],
                        "parentfolder": msg.currentfolder,
                        "filefoldername": msg.file.originalname,
                        "path": msg.file.path,
                        "isDir": stats.isDirectory(),
                        "isStar": false
                    };
                    mongo.collection("filedirectoryinfo").find(fileObj).toArray(function(err, result) {
                        if (err) throw err;
                        //console.log("session"+ req.session.user);
                        console.log("query result"+JSON.stringify(result));

                        if(result.length >0)
                        {
                            console.log("file already exists");

                        }else
                        {
                            mongo.collection("filedirectoryinfo").insertOne(fileObj, function (err, res) {
                                if (err) throw err;
                                console.log("1 document inserted");
                                mongo.returnConnection();

                            });
                            var eventObj = {
                                "username": msg.currentfolder.split('/')[0],
                                "parentfolder": msg.currentfolder,
                                "foldername": msg.file.originalname,
                                "event": "uploaded ",
                                "time": Date(dt.now())

                            };
                            mongo.collection("userevents").insertOne(eventObj, function (err, res) {
                                if (err) throw err;
                                console.log("1 document inserted");
                                mongo.returnConnection();
                            });



                        }
                        // db.close();
                        // return res.status(200).send(JSON.stringify(result));
                    });

                    // db.close();

               // });
                response.code = "200";
                response.value = "Success file upload";
                callback(null, response);


            }
        });
        // mkdirp('./public/uploads/'+msg.parentfolder+"/"+msg.filefoldername , function (err) {
        //     if(!err) {
        //
        //
        //         MongoClient.connect(mongoURL, function(err, db) {
        //             if (err) throw err;
        //             var dirObj = {
        //                 "username": msg.username,
        //                 "parentfolder": msg.parentfolder,
        //                 "filefoldername": msg.filefoldername,
        //                 "path": msg.path,
        //                 "isDir": msg.isDir,
        //                 "isStar": msg.isStar
        //             };
        //             db.collection("filedirectoryinfo").find(dirObj).toArray(function(err, result) {
        //                 if (err) throw err;
        //                 //console.log("session"+ req.session.user);
        //                 console.log("query result"+JSON.stringify(result));
        //
        //                 if(result.length >0)
        //                 {
        //                     console.log("folder already exists");
        //                 }else
        //                 {
        //                     db.collection("filedirectoryinfo").insertOne(dirObj, function (err, res) {
        //                         if (err) throw err;
        //                         console.log("1 document inserted");
        //                         //db.close();
        //
        //                     });
        //                     var eventObj = {
        //                         "username": msg.username,
        //                         "parentfolder": msg.currentfolder,
        //                         "foldername": msg.dirName,
        //                         "event": "uploaded",
        //                         "time": Date(dt.now())
        //
        //                     };
        //                     db.collection("userevents").insertOne(eventObj, function (err, res) {
        //                         if (err) throw err;
        //                         console.log("1 document inserted");
        //
        //                     });
        //
        //
        //
        //                 }
        //                 // db.close();
        //                 // return res.status(200).send(JSON.stringify(result));
        //             });
        //
        //             //db.close();
        //
        //         });
        //
        //         response.code = "200";
        //         response.value = "Success file upload";
        //         callback(null, response);
        //
        //
        //     }
        // });
    }
    catch (e){
        response.code = "204";
        response.value = "Failed upload file";
        callback(null, response);
    }
}

exports.uploadFile = uploadFile;

function toggleStar(msg, callback){

    var response = {};

    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;
            mongo.collection("filedirectoryinfo").updateOne( {path: msg.path}, // query
                {$set: {isStar: msg.isStar}},function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated")
                    console.log("query result of star"+JSON.stringify(result));
                    mongo.returnConnection();


                    response.code = "200";
                    response.value = "Success toggle star";
                    callback(null, response);
                });
        //});
    }
    catch (e){
        response.code = "204";
        response.value = "Failed toggle star";
        callback(null, response);
    }
}

exports.toggleStar = toggleStar;

function deleteFile(msg, callback){

    var response = {};

    try {
console.log("In Kafka Delete" + msg.path);
        var stats = fs.statSync('../node/'+msg.path);
        console.log('is Directory ? ' + stats.isDirectory());
        if(!stats.isDirectory())
        {
            del(['../node/'+msg.path],{force:true}).then(paths => {
                console.log('Deleted files and folders:\n', paths.join('\n'));
                console.log("No error");

                // MongoClient.connect(mongoURL, function(err, db) {
                //
                //     if (err) throw err;

                    var query = {path:msg.path};
                    // console.log("delete file query"+ query);
                    // console.log("delete file query"+ JSON.stringify(query));
                    mongo.collection("filedirectoryinfo").deleteOne(query, function(err, result) {
                        if (err) throw err;
                        console.log("documents deleted");
                        mongo.returnConnection();

                        response.code = "200";
                        response.value = "Success delete file";
                        callback(null, response);
                    });


                });
            //});
        }
        else {
            del(['../node/' + msg.path], {force:true}).then(paths => {
                console.log('Deleted files and folders:\n', paths.join('\n'));
                console.log("No error");

                // MongoClient.connect(mongoURL, function (err, db) {

                    mongo.collection("filedirectoryinfo").deleteMany({path: {$regex: msg.path}}, function (err, result) {
                        if (err) throw err;
                        mongo.returnConnection();
                        console.log(result);
                        console.log("documents deleted");
                        response.code = "200";
                        response.value = "Success delete dir";
                        callback(null, response);
                    });

                    //res.status(204).end();
                });


            //});
        }
    }
    catch (e){
        console.log("ERROR");
        console.log(e);
        response.code = "204";
        response.value = "Failed Delete";
        callback(null, response);
    }
}

exports.deleteFile = deleteFile;