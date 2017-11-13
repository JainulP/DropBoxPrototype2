var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/AppDropbox";
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
var mkdirp = require('mkdirp');
var salt = bcrypt.genSaltSync(10);
var hash ;



function handleLogin(msg, callback){

    var res = {};

    try {
        // mongo.connect(mongoURL, function(){
        // console.log('Connected to mongo at: ' + mongoURL);
        //     console.log(msg.username);
            var coll = mongo.collection('dropboxusers');
            coll.findOne({username: msg.username}, function(err, user){
                if (user) {
                    console.log("password"+user.password);
                    var hash = bcrypt.hashSync(msg.password, salt);
                    var result = bcrypt.compareSync(msg.password, hash);

                    if(result) {
                        console.log("db login result" + user);
                        res.code = "200";
                        res.value = "Success Login";
                        res.user = user;
                        console.log("login res"+ JSON.stringify(res));
                        callback(null, res);
                    }
                    else
                    {
                        res.code = "401";
                        res.value = "Failed Login ?????";
                        console.log("login res"+ JSON.stringify(res));
                        callback(null, res);
                    }

                } else {
                    res.code = "401";
                    res.value = "Failed Login";
                    console.log("login res"+ JSON.stringify(res));
                    callback(null, res);
                }
                mongo.returnConnection();
            });
       // });
    }
    catch (e){
        // done(e,{});
        res.code = "401";
        res.value = "Failed Login";
        console.log("loginnnnn res"+ JSON.stringify(res));
        callback(null, res);
    }
}

exports.handleLogin = handleLogin;

function handleSignup(msg, callback){

    var res1 = {};

    try {
        // MongoClient.connect(mongoURL, function (err, db) {
        //     if (err) throw err;
            var salt = bcrypt.genSaltSync(10);
        // Hash the password with the salt
            hash = bcrypt.hashSync(msg.password.toString(), salt);
            var userObj = {
                "username": msg.username,
                "password": hash,
                "firstname": msg.firstname,
                "lastname": msg.lastname
            };
            mongo.collection("dropboxusers").insertOne(userObj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                // console.log(res);
                mongo.returnConnection();
                var dirObj = {"username": msg.username, "directory":msg.username};

                mongo.collection("filedirectoryinfo").insertOne(dirObj, function (err, res) {
                    if (err) {
                        console.log("error with makedir");
                        throw  err;
                    }
                    console.log("dirObj inserted");
                    mongo.returnConnection();

                    mkdirp('./public/uploads/' + msg.username, function (err) {
                        if (!err) {
                            console.log("No error in making directory with username"+msg.username);
                        }
                    });
                    mkdirp('../node/public/uploads/' + msg.username, function (err) {
                        if (!err) {
                            console.log("No error in making directory with username"+msg.username);
                        }
                    });
                });

            });
                res1.code = "200";
                res1.value = "Success signup";
                res1.username=  msg.username,
                res1.password= msg.password,
                res1.firstname= msg.firstname,
                res1.lastname= msg.lastname

            callback(null, res1);

       // });
    }
    catch (e){
        console.log(e);
            // done(e,{});
            res1.code = "401";
            res1.value = "Failed signup";
            callback(null, res1);
        }
}

exports.handleSignup = handleSignup;

function updateProfile(msg, callback){

    var res = {};

    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //     if (err) throw err;
            var profileObj = {
                "overview": msg.overview,
                "position": msg.position,
                "employer": msg.employer,
                "location":msg.location,
                "degree":msg.degree,
                "university":msg.university,
                "contactnumber":msg.contactnumber,
                "address":msg.address,
                "city": msg.city,
                "state":msg.state,
                "zip":msg.zip
            };
            mongo.collection("dropboxusers").updateOne( {username: msg.username},
                {$set: profileObj},function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated")
                    console.log("query result of userprofile"+JSON.stringify(result));
                    mongo.returnConnection();
                });


            res.code = "200";
            res.value = "Success UpdateProfile";
            callback(null, res);

        //});
    }
    catch (e){
        console.log(e);
        res.code = "401";
        res.value = "Failed Update profile";
        callback(null, res);
    }
}

exports.updateProfile = updateProfile;

function getProfile(msg, callback){

    var res = {};

    try {
            // MongoClient.connect(mongoURL, function(err, db) {
            //
            //     if (err) throw err;

                var query = {username: msg.username};
                mongo.collection("dropboxusers").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("query result"+JSON.stringify(result));
                    mongo.returnConnection();
                    res.code = "200";
                    res.value = "Success get Profile";
                    res.profile = result[0];
                    callback(null, res);

                });

       // });
    }
    catch (e){
        console.log(e);
        res.code = "401";
        res.value = "Failed get profile";
        callback(null, res);
    }
}

exports.getProfile = getProfile;

function updateInterest(msg, callback){

    var res = {};

    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //     if (err) throw err;
            var interestObj = {
                "music": msg.music,
                "shows": msg.shows,
                "sports": msg.sports
            };
            mongo.collection("dropboxusers").updateOne( {username: msg.username},
                {$set: interestObj},function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated")
                    console.log("query result of userInterest"+JSON.stringify(result));
                    mongo.returnConnection();
                });

            res.code = "200";
            res.value = "Success Update Interest";
            callback(null, res);

        //});
    }
    catch (e){
        console.log(e);
        res.code = "401";
        res.value = "Failed Update Interest";
        callback(null, res);
    }
}

exports.updateInterest = updateInterest;

function getInterest(msg, callback){

    var res = {};

    try {

        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;
            var query = {username: msg.username};
            mongo.collection("dropboxusers").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log("query result"+JSON.stringify(result));
                mongo.returnConnection();
                res.code = "200";
                res.value = "Success get Interest";
                res.interests = result[0];
                callback(null, res);

            });

        //});
    }
    catch (e){
        console.log(e);
        res.code = "401";
        res.value = "Failed get Interest";
        callback(null, res);
    }
}

exports.getInterest = getInterest;

function getActivities(msg, callback){

    var res = {};

    try {
        // MongoClient.connect(mongoURL, function(err, db) {
        //
        //     if (err) throw err;
            var query = {username: msg.username};
            mongo.collection("userevents").find(query).toArray(function(err, result) {
                if (err) throw err;

                console.log("query result"+JSON.stringify(result));
                mongo.returnConnection();

                res.code = "200";
                res.value = "Success get Activities";
                res.activities = result;
                callback(null, res);

            });

        //});
    }
    catch (e){
        console.log(e);
        res.code = "401";
        res.value = "Failed get activities";
        callback(null, res);
    }
}

exports.getActivities = getActivities;