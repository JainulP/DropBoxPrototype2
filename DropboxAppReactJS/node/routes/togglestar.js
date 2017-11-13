var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var kafka = require('./kafka/client');

router.post('/toggleStar', function (req, res,next) {


    var toggleStarParams = { path: req.body.dirPath, isStar:req.body.isStarred};
    kafka.make_request('toggleStar_topic',toggleStarParams, function(err,results){
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
        // return res.status(200).send(JSON.stringify(results.list));
    });


});

module.exports = router;
