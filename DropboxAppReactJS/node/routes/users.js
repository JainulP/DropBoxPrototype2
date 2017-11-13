var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var passport = require('passport');
require('./passport')(passport);
var kafka = require('./kafka/client');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash ;

router.get('/',function (req,res) {
   // req.session.username = "Jainul";
    //res.send("Session"+req.session.username);
});
router.use(passport.initialize());

// router.get('/logIn',function (req,res) {
//     console.log("login get");
//     return res.status(201);
// });
router.post('/logIn',function(req, res,next) {

    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send({"user":"error"});
        }
        else {
            req.session.user = user.user.username;
            //req.session.user = user.username;
            console.log(req.session.user);
            console.log("session initilized");
            return res.status(201).send({"user":user, "sessiondata":req.session.user});
        }
    })(req, res, next);



});
router.get('/checkSession', function(req,res) {
    console.log("session username"+req.session.user);
    res.status(200).send({username: req.session.user});
});

router.post('/signUp',function(req, res) {
    var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
    hash = bcrypt.hashSync(req.body.password.toString(), salt);
    var signupParams = { "username": req.body.email, "password": hash,"firstname": req.body.firstname,"lastname":req.body.lastname };
    kafka.make_request('signup_topic',signupParams, function(err,results){
        //console.log('signup_topic in result');
       // console.log(results);
        if(err){
            console.log("signup error");
            throw err;
        }
        else
        {
            if(results.code == 200){
                 req.session.user = results.username;
                // req.session.username = results.user.username;
                console.log("signup session"+ req.session.user)
                return res.status(201).send({"username":req.body.email,"password":req.body.password, "firstname":req.body.firstname, "lastname":req.body.lastname});

            }
            else {
                res.status(401).end();
            }
        }
    });

                mkdirp('./public/uploads/'+req.body.email , function (err) {
                    if(!err) {
                        console.log("No error in making directory with username");
                    }
                });

});




router.get('/logout', function(req,res) {

    console.log("session username"+req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

router.post('/updateProfile',function(req, res) {

    var updateProfileParams = {
        username: req.session.user,
        overview: req.body.overview,
        position: req.body.position,
        employer: req.body.employer,
        location:req.body.location,
        degree:req.body.degree,
        university:req.body.university,
        contactnumber:req.body.contactnumber,
        address:req.body.address,
        city: req.body.city,
        state:req.body.state,
        zip:req.body.zip

    };
    kafka.make_request('updateProfile_topic',updateProfileParams, function(err,results){
        console.log(results);
        if(err){
            console.log("update profile error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                console.log(JSON.stringify(results));
                return res.status(200).end();

            }
            else {
                res.status(204).end();
            }
        }
    });

});

router.get('/userProfile', function (req, res, next) {

    var getProfileParams = {username: req.session.user}

    kafka.make_request('getProfile_topic',getProfileParams, function(err,results){
        console.log(results);
        if(err){
            console.log("get profile error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                console.log(JSON.stringify(results));
                return res.status(200).send(JSON.stringify(results.profile));

            }
            else {
                res.status(204).end();
            }
        }
    });

});


router.post('/updateInterests',function(req, res) {

    var updateInterestParams = {
        username: req.session.user,
        music: req.body.music,
        shows: req.body.shows,
        sports: req.body.sports

    };
    kafka.make_request('updateInterest_topic',updateInterestParams, function(err,results){
        console.log(results);
        if(err){
            console.log("update interest error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                console.log(JSON.stringify(results));
                return res.status(201).end();

            }
            else {
                res.status(204).end();
            }
        }
    });

});

router.get('/userInterest', function (req, res, next) {

    var getInterestParams = {username: req.session.user}

    kafka.make_request('getInterest_topic',getInterestParams, function(err,results){
        console.log(results);
        if(err){
            console.log("get interest error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                console.log(JSON.stringify(results));
                return res.status(200).send(JSON.stringify(results.interests));

            }
            else {
                res.status(204).end();
            }
        }
    });

});


router.get('/getActivityReport', function (req, res, next) {

    var getActivityParams = {username: req.session.user}

    kafka.make_request('getActivities_topic',getActivityParams, function(err,results){
        console.log(results);
        if(err){
            console.log("get activities error");
            throw err;
        }
        else
        {
            if(results.code == 200){

                console.log(JSON.stringify(results));
                return res.status(200).send(JSON.stringify(results.activities));

            }
            else {
                res.status(204).end();
            }
        }
    });

});

module.exports = router;


