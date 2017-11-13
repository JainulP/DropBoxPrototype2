var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/AppDropbox";
var MongoClient = require('mongodb').MongoClient;


function shareFile(msg, callback){

    var res = {};
    console.log("In share file request:"+ JSON.stringify(msg));
    try {


        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;

            var query = {sharedbyuser: msg.sharedbyuser , sharedtouser: msg.sharedtouser, path:msg.path, filefoldername: msg.filefoldername, isDir: msg.isDir };
            mongo.collection("shareinfo").insertOne(query,function (err,res) {
                if (err) {
                    console.log("error with shareinfo");
                    throw  err;
                }
                //db.close();
                mongo.returnConnection();
            });

            res.code = "200";
            res.value = "Success share file";
            callback(null, res);
        //});



    }
    catch (e){
        // done(e,{});
        console.log(e);
        res.code = "204";
        res.value = "Failed share file";
        callback(null, res);
    }
}

exports.shareFile = shareFile;