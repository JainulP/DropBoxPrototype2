import React, {Component} from 'react';
import Ionicon from 'react-ionicons'
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import SideNavBar from "./SideNavBar";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {DropdownButton} from "react-bootstrap";
import {MenuItem} from "react-bootstrap";
import '.././CSS/homepagecss.css';

class Groups extends Component {


    static propTypes = {
        classes: PropTypes.object,
        username: PropTypes.string,
        classes: PropTypes.object,

        // handleLogout: PropTypes.func,
    };


    constructor() {
        super();
        this.state = {
            username : '',
            files: [],
            dirName:'',
            groupName:'',
            open: false,
            isDir: false,
            sharedfiles:[],
            currentfolder:'',
            dirPath :'',
            shareWith: '',
            shareDirectoryPath:'',
            isStarred: false,
            filesUnderDir: [],
            mydirClicked: false,
            listDir: [],
            listFile : [],
            member:'',
            groups:[],
            members: [],
            groupClicked : false
        };

    }


    componentWillMount() {

        var username = this.props.username;

        this.setState({     username: username,
            currentfolder:username,
            member:username,
            isShared: false,
            mydirClicked: false,
            groupClicked:false
        });

        API.getGroups(username)
            .then((data)=>{
                this.setState({
                    groups: data
                })
            });
        API.getGroupfiles(username)
            .then((data) => {
                if(data.list) {
                    // var star =[];
                    // var arrNotStar = [];
                    var arrStar = [];
                    var arrNotStar = [];
                    data.list.map(file => {

                        if (file.isStar) {
                            arrStar.push(file);
                        }
                        else {
                            arrNotStar.push(file);
                        }
                    });
                }else
                {

                }

            });

    };

    componentDidMount() {
        document.title = `Group - Dropbox`;
    };


    handleFileUpload = (event) => {
        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload,this.state.currentfolder,this.state.groupName)
            .then((status) => {
                if (status === 204) {
                    API.getGroupfiles(this.state.currentfolder)
                        .then((data) => {
                            if(data.list) {
                                this.setState({
                                    files: data.list
                                });
                            }
                        });

                }
            });

    };


    handleDelete = (event,param) => {
        console.log("deleting path"+param);
        API.deleteIt(param)
            .then((status) => {
                console.log("delete executed" + status);
                if(status === 200) {
                    // API.getfiles(this.state.currentfolder)
                    //     .then((data) => {
                    //         this.setState({
                    //             files: data
                    //         });
                    //     });

                    API.getGroupfiles(this.state.currentfolder)
                        .then((data) => {
                        if(data.list) {
                            this.setState({
                                files: data.list
                            });
                        }
                        });

                }
            });


    };

    addMember = (payload) => {
    console.log("add member payload"+ JSON.stringify(payload));
    API.addMember(payload)
        .then((status)=> {
            if (status == 204) {

                API.getMembers(payload.groupName)
                    .then((data) => {
                        // if(this.state.isShared) {
                        console.log("members name " + JSON.stringify(data));
                        this.setState({
                            members: data
                        })


                    });
            }
        });


    };

    deleteMember = (payload) => {
        console.log("deleting member"+JSON.stringify(payload));
        API.deleteMember(payload)
            .then((status) => {
                console.log("delete executed" + status);

                API.getMembers(payload.groupName)
                    .then((data) => {
                        // if(this.state.isShared) {
                        console.log("members name " + JSON.stringify(data));
                        this.setState({
                            members: data
                        })


                    });

            });

    };

    deleteGroup = (payload) => {
        console.log("deleting group"+JSON.stringify(payload));
        API.deleteGroup(payload)
            .then((status) => {
                console.log("delete executed" + status);
                API.getGroups(this.state.username)
                    .then((data)=>{
                        this.setState({
                            groups: data
                        })
                    });

            });

    };

    createGroup = (data) => {
        API.createGroup(data)
            .then((status) => {
                if (status === 204) {
                    API.getGroups(this.state.username)
                        .then((data)=>{
                        this.setState({
                            groups: data
                        })
                        });
                }
            });
    };

    showGroupData = (param) => {
        // var subpath = param.replace("public/uploads/","");

        console.log("group name is"+param);
        API.getMembers(param)
            .then((data) => {
                // if(this.state.isShared) {
                console.log("members name "+JSON.stringify(data));
                    this.setState({
                        members: data,
                        // sharedfiles: data,
                        // fileUnderUpload: param,
                        // currentfolder:subpath
                    });
                // }
                // else
                // {
                //     this.setState(
                //         {
                //             filesUnderDir: data,
                //             files:data,
                //             showpage: true,
                //             fileUnderUpload: param,
                //             currentfolder:subpath
                //         }
                //     );
                // }
        });

        API.getGroupfiles(this.state.currentfolder)
            .then((data) => {
            console.log("group files");
                console.log(JSON.stringify(data));
                if(data.list) {
                    console.log(data.list);
                    this.setState({
                        files: data.list
                    });
                }
            });

    };

    showFileUnderDir = (param) => {
        var subpath = param.replace("public/uploads/","");
        console.log("subpath@@@"+ subpath);
        console.log("param is"+param);
        API.getfiles(subpath)
            .then((data) => {
                if(this.state.isShared) {
                    this.setState({
                        filesUnderDir: data,
                        sharedfiles: data,
                        fileUnderUpload: param,
                        currentfolder:subpath
                    });
                }
                else
                {
                    this.setState(
                        {
                            filesUnderDir: data,
                            files:data,
                            showpage: true,
                            fileUnderUpload: param,
                            currentfolder:subpath
                        }
                    );}});


    };

    createDirectory = (data) => {
        API.createDirectory(data)
            .then((status) => {
                if (status === 200) {
                    // API.getfiles(this.state.currentfolder)
                    //     .then((data) => {
                    //         if(data.list) {
                    //             var arrStar = [];
                    //             var arrNotStar = [];
                    //             data.list.map(file => {
                    //
                    //                 if (file.isStar) {
                    //                     arrStar.push(file);
                    //                 }
                    //                 else {
                    //                     arrNotStar.push(file);
                    //                 }
                    //             });
                    //
                    //             this.setState({
                    //                 files: arrNotStar,
                    //                 starred: arrStar
                    //             });
                    //         }
                    //     });
                }
            });
    };


    render(){
        return(
            <div className="container-fluid">
                <div className="row sidemenu" >

                    <SideNavBar/>


                    <main role="main" className="col-sm-10">
                        <h1 className="header col-sm-8">Groups</h1>
                        <h1 className="header ion-person col-sm-4" onClick={
                            event=> {this.showUserProfile}
                        }></h1>


                        <div className="col-sm-9">

                            <div style={(this.state.members.length>0) ? {display: "none"} :{}}>
                                <div className="row groups">
                                <div className="col-md-7 header">All Groups</div>
                                <div className="col-md-4  createdby "> Created By</div>
                                    <div className="col-md-1  createdby "> </div>
                                </div>
                                {/*<h2 className="header category" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>Shared with me</h2>*/}
                                <span style={ (this.state.groups.length>0) ? {display: "none"} :{}}>No Groups</span>
                                <ul className="list-group">
                                    {this.state.groups.map(group => (
                                        <li className="list-group-item row" key={group.groupName}>
                                            <div className="col-md-7">
                                            <span className="ion-ios-people"></span>
                                            <span className="listContent groupname"
                                                  onClick={(event) => {
                                                      this.setState(
                                                          {
                                                              groupName: group.groupName,
                                                              currentfolder: group.createdBy + "/" + group.groupName,
                                                              groupClicked:true
                                                          },
                                                          () => this.showGroupData(this.state.groupName)
                                                      );
                                            }}
                                            >{group.groupName}</span></div>
                                            <div className="col-md-4 createdby">
                                            <div style = {group.createdBy === localStorage.getItem("username") ? {} : {display: "none"} }>Self</div>
                                            <div style = {group.createdBy === localStorage.getItem("username") ? {display: "none"} : {} }>{group.createdBy}</div>
                                            </div>
                                            <div className="col-md-1 btn-group pull-right" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-secondary btnshare ion-ios-trash" style = {group.createdBy === localStorage.getItem("username") ? {} : {display: "none"}}
                                                        onClick={event => {
                                                            this.setState(
                                                                {
                                                                    groupName: group.groupName,
                                                                },
                                                                () => this.deleteGroup(this.state)
                                                            );
                                                        }}
                                                ></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={ (this.state.members.length>0) ? {} :{display: "none"}}>
                                <div className="row groups">
                                <div className="col-md-8 header">Members</div>

                                <div className="col-md-4 btn-group pull-right" role="group">
                                    <button  type ="button" className= "btn btn-secondary uploadBtn" id="mymodal" data-toggle="modal" data-target="#exampleModal"
                                    > Add Member
                                    </button>
                                </div>
                                </div>
                                {/*<h2 className="header category" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>Shared with me</h2>*/}
                                <span style={ (this.state.members.length>0) ? {display: "none"} :{}}>No Members</span>
                                <ul className="list-group" style={ (this.state.members.length>0) ? {} :{display: "none"}}>
                                    {this.state.members.map(member => (
                                        <li className="list-group-item" key={member.member}>

                                            <span className="ion-ios-person" ></span>
                                            <span className="listContent">{member.member}</span>
                                            <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-secondary btnshare ion-ios-trash" style = {member.member === localStorage.getItem("username") ? {display: "none"} : {}}
                                                         onClick={event => {
                                                            this.setState(
                                                                {
                                                                    member: member.member,
                                                                },
                                                                () => this.deleteMember(this.state)
                                                            );
                                                         }}
                                                ></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div >
                                <h2 className="header category" style={ (this.state.groupClicked) ? {} :{display: "none"}}>Files</h2>
                                {/*<h2 className="header category" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>Shared with me</h2>*/}
                                <span style={ (this.state.files.length>0 || !(this.state.groupClicked)) ? {display: "none"} :{}}>No Files</span>
                                <ul className="list-group" style={ (this.state.files.length>0) ? {} :{display: "none"}}>
                                    {this.state.files.map(file => (
                                        <li className="list-group-item" key={file.filefoldername}>
                                    <span className="ion-document-text"  style={
                                        file.isDir == false
                                            ? {}
                                            : { display: "none" }
                                    } ></span>
                                            <span className="ion-ios-folder"  style={
                                                file.isDir == true
                                                    ? {}
                                                    : { display: "none" }
                                            } ></span>
                                            <span className="listContent" onClick={event => {
                                                this.setState(
                                                    {
                                                        dirPath: file.path,
                                                        mydirClicked:true

                                                    },
                                                    () => this.showFileUnderDir(this.state.dirPath)
                                                );
                                            }}>{file.filefoldername}</span>
                                            <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                                <a  type ="button" className= "btn btn-secondary btnshare ion-ios-cloud-download downloadlink"
                                                    href={"http://localhost:3001/" + file.path.replace("public/","")}
                                                    style={
                                                        file.isDir == false || file.isDir == null
                                                            ? {}
                                                            : { display: "none" }
                                                    }
                                                    download={file.filefoldername}
                                                >
                                                </a>
                                                <button type="button" className="btn btn-secondary btnshare ion-ios-trash" style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}

                                                        onClick={event => this.handleDelete(event, file.path)}
                                                ></button>

                                            </div>
                                        </li>

                                    ))}
                                    {/*<li className="list-group-item"><span className="ion-ios-folder" ></span>*/}
                                        {/*<span className="listContent" onClick={event => {*/}
                                            {/*this.setState(*/}
                                                {/*{*/}
                                                    {/*// dirPath: file.path,*/}
                                                    {/*// isShared:true,*/}
                                                    {/*// mydirClicked:false,*/}


                                                {/*},*/}

                                            {/*);*/}
                                        {/*}}>GroupFolder</span>*/}
                                        {/*<div className="btn-group pull-right" role="group" aria-label="Basic example">*/}
                                        {/*<button type="button" className="btn btn-secondary btnshare ion-ios-trash"*/}


                                        {/*></button></div></li>*/}

                                </ul>
                            </div>

                        </div>


                        <div className="col-sm-3 rightBlock" style={ (this.state.isShared) ? {display: "none"} :{}}>

                            <input
                                className="form-control rightDivTop"
                                type="text"
                                label="createdir"
                                placeholder="Group name"
                                value={this.state.groupName}
                                onChange={event => {
                                    this.setState({
                                        groupName: event.target.value
                                    });
                                }}
                                style={ (this.state.members.length>0) ? {display: "none"} :{}}
                            />


                            <button
                                className="btn uploadBtn rightDivTop"
                                type="button"
                                onClick={() => this.createGroup(this.state)
                                }
                                style={ (this.state.members.length>0) ? {display: "none"} :{}}
                            >
                                Create Group
                            </button>


                            <input
                                className="form-control rightDivTop"
                                type="text"
                                label="createdir"
                                placeholder="Folder name"
                                value={this.state.dirName}
                                onChange={event => {
                                    this.setState({
                                        dirName: event.target.value
                                    });
                                }} />


                            <button
                                className="btn uploadBtn rightDivTop"
                                type="button"
                                onClick={(event) => {
                                    this.setState({
                                        isDir: true
                                    }, () => this.createDirectory(this.state));
                                }}
                            >
                                Create Folder
                            </button>
                            <div className="rightDivTop" >
                                <span className="rightPaneUploadfile">Choose a file to upload</span>
                            </div>
                            <div className="rightDivTop">

                                {/*<input*/}
                                {/*className={'fileupload'}*/}
                                {/*type="file"*/}
                                {/*name="myfile"*/}
                                {/*onChange={this.handleFileUpload}*/}
                                {/*/>*/}
                                <label className="btn btn-default btn-file">
                                    Choose a file to upload <input type="file" style={{display: "none"}} name= "myfile" onChange={this.handleFileUpload}/>
                                </label>
                            </div>


                        </div>
                    </main>

                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter Username or email</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="modalclose" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    className="input-share-with"
                                    id="addmember"
                                    name="addmember"
                                    type="text"
                                    onChange={event => {
                                        this.setState({ member: event.target.value });
                                    }}
                                    multiple
                                />
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.addMember(this.state);
                                }}>Done</button>
                                {/*<button*/}
                                {/*type="button"*/}
                                {/*onClick={() => {*/}
                                {/*this.handleShare(this.state);*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*Done*/}
                                {/*</button>*/}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Groups);
