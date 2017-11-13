
// var mongoURL = "mongodb://localhost:27017/AppDropbox";
// var MongoClient = require('mongodb').MongoClient;
var mkdirp = require('mkdirp');
var mongo = require("./mongo");

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));
function createDirectory(msg, callback){

    var response = {};
    try {
            mkdirp('./public/uploads/'+msg.parentfolder+"/"+msg.filefoldername , function (err) {
            if(!err) {

                mkdirp('../node/public/uploads/'+msg.parentfolder+"/"+msg.filefoldername , function (err) {
                    if(!err) {
                        // MongoClient.connect(mongoURL, function (err, db) {
                            //if (err) throw err;
                            var dirObj = {
                                "username": msg.username,
                                "parentfolder": msg.parentfolder,
                                "filefoldername": msg.filefoldername,
                                "path": msg.path,
                                "isDir": msg.isDir,
                                "isStar": msg.isStar
                            };
                            mongo.collection("filedirectoryinfo").find(dirObj).toArray(function (err, result) {
                                if (err) throw err;
                                //console.log("session"+ req.session.user);
                                console.log("query result" + JSON.stringify(result));

                                if (result.length > 0) {
                                    console.log("folder already exists");
                                } else {
                                    mongo.collection("filedirectoryinfo").insertOne(dirObj, function (err, res) {
                                        if (err) throw err;
                                        console.log("1 document inserted");
                                        //db.close();
                                        mongo.returnConnection();

                                    });
                                    var eventObj = {
                                        "username": msg.username,
                                        "parentfolder": msg.currentfolder,
                                        "foldername": msg.dirName,
                                        "event": "created",
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

                            //db.close();

                       // });

                        response.code = "200";
                        response.value = "Success create dir";
                        callback(null, response);
                    }
                });
            }
        });
    }
    catch (e){
        // done(e,{});
        response.code = "204";
        response.value = "Failed create dir ?????";
        callback(null, response);
    }
}

exports.createDirectory = createDirectory;