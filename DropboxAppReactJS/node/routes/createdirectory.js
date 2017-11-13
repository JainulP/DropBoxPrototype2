var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

//
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));


router.get('/',function (req,res) {
    // req.session.username = "Jainul";
    //res.send("Session"+req.session.username);
});
router.post('/createDirectory', function (req,res) {

    var fullpath = "public/uploads/" +req.body.currentfolder + "/"+req.body.dirName;

    var createDirParams = { username: req.body.username, parentfolder:req.body.currentfolder, filefoldername:req.body.dirName,path:fullpath, isDir:true,isStar:false};
    kafka.make_request('createDir_topic',createDirParams, function(err,results){
        console.log(results);
        if(err){
            console.log("create dir error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                // req.session.username = results.user.username;
                console.log(JSON.stringify(results));
                //return res.status(200).send({list: results.list});
                return res.status(200).end();

            }
            else {
                res.status(204).end();
            }
        }
    });

});


module.exports = router;


