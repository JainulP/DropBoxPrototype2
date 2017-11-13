const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/logIn`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },

            data : {
                "username" : payload.username,
                "password" : payload.password
            },
        credentials:'include',
        body: JSON.stringify(payload)})
        .then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignUp = (payload) =>
    fetch(`${api}/users/signUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/users/logout`, {
        credentials:'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const createDirectory = (payload) =>
    fetch(`${api}/createdirectory/createDirectory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export  const createGroup = (payload) =>
    fetch(`${api}/groups/createGroup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const deleteGroup = (payload) =>
    fetch(`${api}/groups/deleteGroup?groupname=`+payload.groupName,
        {credentials:'include'}
        ).then( res =>{
            return res.status;
        })
        .catch(error => {
            console.log("This is an error.");
            return error;
        });

export  const addMember = (payload) =>
    fetch(`${api}/groups/addMember`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getGroups = (param) =>
    fetch(`${api}/groups/getGroups?username=`+param)
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });
export const getMembers = (param) =>
    fetch(`${api}/groups/getMembers?groupname=`+param,{credentials:'include'})
        .then( res =>{
         return res.json();
        })
        .catch(error => {
            console.log("This is an error.");
            return error;
        });

export const deleteMember = (payload) =>
    fetch(`${api}/groups/deleteMember?groupname=`+payload.groupName+`&memberName=`+payload.member,{credentials:'include'})
        .then( res =>{
            return res.status;
        })
        .catch(error => {
            console.log("This is an error.");
            return error;
        });

export const getfiles = (param) =>
    fetch(`${api}/displayfilefolder/getfilefolder?currentfolder=`+param)
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });
export const getGroupfiles = (param) =>
    fetch(`${api}/displayfilefolder/getGroupfile?currentfolder=`+param)
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload,param1, param2) =>
    fetch(`${api}/upload/upload?currentfolder=`+param1+`&groupname=`+param2, {
        method: 'POST',
        body: payload,
        credentials:'include'
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const deleteIt = (param) =>
    fetch(`${api}/deletefile/deletefile?filePath=`+param, {
        credentials:'include'
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const toggleStar = (payload) =>
    fetch(`${api}/togglestar/toggleStar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("Star response::::"+res);
        return res.status;
    })
        .catch(error => {
            console.log("Star response::::This is error");
            return error;
        });

export const getSharedFiles = (param) =>
    fetch(`${api}/displayfilefolder/getsharedfilefolder?username=`+param)
        .then(res =>   res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const checkSession = () =>
    fetch(`${api}/users/checkSession`, {
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const updateUserProfile = (payload) =>
    fetch(`${api}/users/updateProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const updateUserInterest = (payload) =>
    fetch(`${api}/users/updateInterests`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getUserProfile =() =>
    fetch(`${api}/users/userProfile`,
    {
        credentials:'include'
    }).then(res => {
            return res.json();
        })
        .catch(error =>{
            console.log("This is error.");
            return error;
        });



export const shareFileDirectory = (payload) =>
    fetch(`${api}/sharefiledir/sharefiledir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getActivityReport = (username) =>
    fetch(`${api}/users/getActivityReport?username=`+username,
        {
            credentials:'include'
        })
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const getUserInterests = (username) =>
    fetch(`${api}/users/userInterest?username=`+username,
{
    credentials:'include'})
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });
