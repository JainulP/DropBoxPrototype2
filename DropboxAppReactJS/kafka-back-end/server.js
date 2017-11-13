var connection =  new require('./kafka/Connection');
var users = require('./services/users');
var listDir = require('./services/listDir');
var dirOperations = require('./services/dirOperations');
var fileOperations = require('./services/fileOperations');
var filesharing = require('./services/filesharing');


// var connection =  new require('./kafka/Connection');
var login_topic = 'login_topic';
var signup_topic = 'signup_topic';
var getFileDir_topic = 'getFileDir_topic';
var createDir_topic = 'createDir_topic';
var fileupload_topic = 'fileupload_topic';
var toggleStar_topic = 'toggleStar_topic';
var delete_topic = 'delete_topic';
var sharefile_topic = 'sharefile_topic';
var getsharedfiles_topic = 'getsharedfiles_topic';
var updateProfile_topic = 'updateProfile_topic';
var getProfile_topic= 'getProfile_topic';
var updateInterest_topic = 'updateInterest_topic';
var getInterest_topic = 'getInterest_topic';
var getGroups_topic = 'getGroups_topic';
var getMembers_topic = 'getMembers_topic';
var getGroupData_topic = 'getGroupData_topic';
var deleteGroup_topic = 'deleteGroup_topic';
var deleteMember_topic = 'deleteMember_topic';
var getActivities_topic= 'getActivities_topic';

var consumer = connection.getConsumer(login_topic);
var producer = connection.getProducer();

consumer.addTopics([signup_topic,getFileDir_topic,createDir_topic,fileupload_topic,toggleStar_topic,delete_topic,sharefile_topic,getsharedfiles_topic,updateProfile_topic,getProfile_topic,updateInterest_topic,getInterest_topic,getActivities_topic], function (err, added) {
});

console.log('server is running');
consumer.on('message', function (message) {
    console.log(message);
    if(message.topic == login_topic) {
        //console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        users.handleLogin(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });
    }
    else if(message.topic == signup_topic)
    {
        console.log('server is running');
        // consumer.on('message', function (message) {
            console.log('message for signup req received');

            var data = JSON.parse(message.value);
            users.handleSignup(data.data, function(err,res){
                // console.log('after handle signup'+res);
                var payloads = [
                    {   topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                   // console.log(data);
                });
                return;
            });
    // });
    }
    else if(message.topic == getFileDir_topic ) {
        console.log('message for list dir req received');
       // console.log("listdir***************" + JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        // console.log("listdir***************data" + data.data);
        listDir.getListDirectory(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    else if(message.topic == createDir_topic ) {
        console.log('message for create dir req received');
        // console.log("listdir***************" + JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        // console.log("listdir***************data" + data.data);
        dirOperations.createDirectory(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });
    }

    else if(message.topic == fileupload_topic ) {
        console.log('message for file upload received');
        var data = JSON.parse(message.value);
        console.log(data);

        fileOperations.uploadFile(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });
    }

    else if(message.topic == toggleStar_topic ) {
        console.log('message for toggle star received');
        var data = JSON.parse(message.value);
        console.log(data);

        fileOperations.toggleStar(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });
    }

    else if(message.topic == delete_topic ) {
        console.log('message for delete file dir received');
        var data = JSON.parse(message.value);
        console.log(data);

        fileOperations.deleteFile(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
               // console.log(data);
            });
            return;
        });
    }

    else if(message.topic == sharefile_topic ) {
        console.log('message for share file received');
        var data = JSON.parse(message.value);
        console.log(data);

        filesharing.shareFile(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }

    else if(message.topic == getsharedfiles_topic ) {
        console.log('message for get share file received');
        var data = JSON.parse(message.value);
        console.log(data);

        listDir.getSharedFileList(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }
    else if(message.topic == updateProfile_topic ) {
        console.log('message for update profile received');
        var data = JSON.parse(message.value);
        console.log(data);

        users.updateProfile(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }
    else if(message.topic == getProfile_topic)
    {
        console.log('message for get profile received');
        var data = JSON.parse(message.value);
        console.log(data);

        users.getProfile(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }
    else if(message.topic == updateInterest_topic)
    {
        console.log('message for update interest received');
        var data = JSON.parse(message.value);
        console.log(data);

        users.updateInterest(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }
    else if(message.topic == getInterest_topic)
    {
        console.log('message for get interest received');
        var data = JSON.parse(message.value);
        console.log(data);

        users.getInterest(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }
    else if(message.topic == getActivities_topic)
    {
        console.log('message for get activities received');
        var data = JSON.parse(message.value);
        console.log(data);

        users.getActivities(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                // console.log(data);
            });
            return;
        });
    }


});
