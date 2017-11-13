var mongoURL = "mongodb://localhost:27017/AppDropbox";
var MongoClient = require('mongodb').MongoClient;


function createGroup(msg, callback){

    var res = {};
    console.log("In create group request:"+ JSON.stringify(msg));
    try {
        MongoClient.connect(mongoURL, function(err, db) {

            if (err) throw err;

            if(msg.isGroup != null)
            {
                var query = {parentfolder: msg.parentfolder, isGroup:msg.isGroup};

            }
            else {
                var query = {parentfolder: msg.parentfolder, isGroup: null};
            }
            db.collection("filedirectoryinfo").find(query).toArray(function(err, result) {
                if (err) throw err;
                //db.close();
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

        });
    }
    catch (e){
        // done(e,{});
        console.log(e);
        res.code = "204";
        res.value = "Failed create";
        callback(null, res);
    }
}

exports.createGroup = createGroup;