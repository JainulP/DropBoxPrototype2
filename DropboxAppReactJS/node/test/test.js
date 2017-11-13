var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");

describe('http tests', function(){
    it('should return logIn page for correct url', function(done){
        http.get('http://localhost:3000/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should not return page for wrong url', function(done){
        http.get('http://localhost:3000/abc', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });
    it('should return list of directories for correct user', function(done){
        http.get('http://localhost:3001/displayfilefolder/getfilefolder?currentfolder=jainul1@gmail.com', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });
    it('should signup for correct details', function(done) {
        request.post(
            'http://localhost:3001/users/signUp',
            { form: {
                "email" : "nir@gmail.com",
                "password" : "nir123",
                "firstname" : "nir",
                "lastname" : "patel"
            } },
            function (error, response, body) {
                assert.equal(201, response.statusCode);
                done();
            }
        );
    });


    it('should allow to login', function(done) {
        request.post(
            'http://localhost:3001/users/logIn',
            { form: { "username": 'jainul1@gmail.com',"password":'123123'} },
            function (error, response, body) {
                assert.equal(201, response.statusCode);
                done();
            }
        );
    });

    it('should return user profile page for correct url', function(done){
        http.get('http://localhost:3001/users/userProfile', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return groups page for correct url', function(done){
        http.get('http://localhost:3001/groups/getGroups?username=jainul1@gmail.com', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return activity report for correct url', function(done){
        http.get('http://localhost:3001/users/getActivityReport?username=jainul1@gmail.com', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return user interest page for correct url', function(done){
        http.get('http://localhost:3001/users/userInterest?username=jainul1@gmail.com', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return group members for correct url', function(done){
        http.get('http://localhost:3001/groups/getMembers?groupname=CMPE 273', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });





});