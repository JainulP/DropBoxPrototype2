var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/AppDropbox";
var MongoClient = require('mongodb').MongoClient;


function getListDirectory(msg, callback){

    var res = {};
    console.log("In list diresctory request:"+ JSON.stringify(msg));
    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;

            if(msg.isGroup != null)
            {
                var query = {parentfolder: msg.parentfolder, isGroup:msg.isGroup};

            }
            else {
                var query = {parentfolder: msg.parentfolder, isGroup: null};
            }
            mongo.collection("filedirectoryinfo").find(query).toArray(function(err, result) {
                if (err) throw err;
                mongo.returnConnection();
                if(result.length>0)
                {
                    res.code = "200";
                    res.value = "Success list dir";
                    res.list = result;
                    callback(null, res);
                }
                else
                {
                    res.code = "204";
                    res.value = "Failed list dir ?????";
                    callback(null, res);
                }
            });

        //});
    }
    catch (e){
        // done(e,{});
        console.log(e);
        res.code = "204";
        res.value = "Failed list dir11 ?????";
        //console.log("failed list dir res"+ JSON.stringify(res));
        callback(null, res);
    }
}

exports.getListDirectory = getListDirectory;

function getSharedFileList(msg, callback){

    var res = {};
    console.log("In get shared file request:"+ JSON.stringify(msg));
    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;

                var query = {sharedtouser: msg.sharedtouser};

            //var query = {parentfolder: msg.parentfolder};
            mongo.collection("shareinfo").find(query).toArray(function(err, results) {
                if (err) throw err;

                if(results.length>0)
                {
                    var resArr= [];
                    // for(var i = 0; i < results.length; i++) {
                    //
                    //     //var query = {path: {$regex: msg.path}};
                    //     var query = {path: results[i].path};
                    //     mongo.collection("filedirectoryinfo").find(query).toArray(function (err, result) {
                    //         if (err) throw err;
                    //         console.log("query result" + JSON.stringify(result));
                    //         mongo.returnConnection();
                    //         resArr.push(result);
                    //
                    //
                    //     });
                    //
                    //     // console.log("?????????????????????????????")
                    //     // console.log(i);
                    //     // if(i === results.length-1)
                    //     // {
                    //     //     console.log("first loop");
                    //     //     res.code = "200";
                    //     //     res.value = "Success list shared files";
                    //     //     res.list = resArr;
                    //     //     callback(null, res);
                    //     // }
                    // }
                    //
                    // if(resArr.length >0)
                    // {
                    // console.log("}}}}}}}}}::::");
                    // console.log(resArr);}

                    res.code = "200";
                    res.value = "Success list shared files";
                    res.list = results;
                    callback(null, res);



                }
                else
                {
                    res.code = "204";
                    res.value = "Failed list shared files";
                    callback(null, res);
                }
                mongo.returnConnection();
            });

        //});
    }
    catch (e){
        // done(e,{});
        console.log(e);
        res.code = "204";
        res.value = "Failed list shared files";
        callback(null, res);
    }
}

exports.getSharedFileList = getSharedFileList;