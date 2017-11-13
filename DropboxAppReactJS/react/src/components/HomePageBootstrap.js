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
import '.././CSS/homePage.css';

class HomePageBootstrap extends Component {


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
            // showpage:false,
            filesUnderDir: [],
            starred:[],
            starredFiles:[],
            starredDir:[],
            isShared: false,
            mydirClicked: false,
            listDir: [],
            listFile : [],
            filename: ''
        };
        // this.handleLogout = this.handleLogout.bind(this);
    }


    componentWillMount() {

        var username = this.props.username;
        console.log("username in will mount "+username);
        //
        API.checkSession()
            .then((data)=>{
            console.log("session checksessiom");
            console.log(data);
                if(data.username === undefined)
                {
                    this.props.history.push("/login");
                }
                else {
                    this.setState({     username: username,
                        currentfolder:username,
                        isShared: false,
                        mydirClicked: false,
                    });

                    API.getfiles(username)
                        .then((data) => {
                            console.log("gghhjj");
                            console.log(data.list);

                            if(data.list) {
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
                                // data.listFile.map(file => {
                                //
                                //     if(file.isStar)
                                //     {
                                //         arrStar.push(file);
                                //     }
                                //     else
                                //     {
                                //         arrNotStar.push(file);
                                //     }
                                // });

                                this.setState({
                                    files: arrNotStar,
                                    starred: arrStar
                                });
                            }
                            else
                            {
                                this.setState({
                                    files: [],
                                    starred: []
                                });
                            }
                        });

                    API.getSharedFiles(username)
                        .then((data) => {
                        console.log(data);
                            // if(data.list) {
                                this.setState({
                                    sharedfiles: data
                                });
                            // }
                            // else {
                            //     this.setState({
                            //         sharedfiles: []
                            //     });
                            // }
                        });

                }
            });
    };

    componentDidMount() {
        document.title = `Home - Dropbox`;
    };


    handleFileUpload = (event) => {
        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);


        API.uploadFile(payload,this.state.currentfolder,null)
            .then((status) => {
                if (status === 204) {
                    API.getfiles(this.state.currentfolder)
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

    handleStar = (payload) => {
        console.log("Handle Star"+JSON.stringify(payload));
        API.toggleStar(payload)
            .then((status) => {
                console.log("star executed" + status);
                if (status === 200) {

                    API.getfiles(this.state.currentfolder)
                        .then((data) => {
                            if(data.list) {
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

                                this.setState({
                                    files: arrNotStar,
                                    starred: arrStar
                                });
                            }
                        });
                }
            })};

    handleDelete = (event,param) => {
        console.log("deleting path"+param);
        API.deleteIt(param)
            .then((status) => {
                console.log("delete executed" + status);
                if(status === 200) {
                    API.getfiles(this.state.currentfolder)
                        .then((data) => {
                            if (data.list) {
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

                                this.setState({
                                    files: arrNotStar,
                                    starred: arrStar
                                });
                            }
                        });
                    }
            });


    };

    createDirectory = (data) => {
        API.createDirectory(data)
            .then((status) => {
                if (status === 200) {
                    // API.getfiles(this.state.currentfolder)
                    //     .then((data) => {
                    //         this.setState({
                    //             files: data
                    //         });
                    //     });
                    API.getfiles(this.state.currentfolder)
                        .then((data) => {
                            if(data.list) {
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

                                this.setState({
                                    files: arrNotStar,
                                    starred: arrStar
                                });
                            }
                        });
                }
            });
    };

    showUserProfile = (event)=>
    {
        this.props.history.push("/userprofile");
    }

    handleShare = (payload) => {
        //const payload = new FormData();

        API.shareFileDirectory(payload)
            .then((status) => {
                if (status === 200) {
                    console.log("sharing successful");
                }
            });

    };

    showFileUnderDir = (param) => {
        var subpath = param.replace("public/uploads/","");
        console.log("subpath@@@"+ subpath);
        console.log("param is"+param);
        API.getfiles(subpath)
            .then((data) => {
                if(data.list)
                {
                if(this.state.isShared) {
                    this.setState({
                        filesUnderDir: data.list,
                        sharedfiles: data.list,
                        fileUnderUpload: param,
                        currentfolder:subpath
                    });
                }
                else {
                    // if(data.results) {
                    this.setState(
                        {
                            filesUnderDir: data.list,
                            files: data.list,
                            showpage: true,
                            fileUnderUpload: param,
                            currentfolder: subpath
                        }
                    );

                    // }
                }
        }
        else {
                    this.setState(
                        {
                            files: [],
                            filesUnderDir:[],
                            currentfolder: subpath,
                            fileUnderUpload: param,
                        });
                    console.log("No files under folder");
                }
        });


    };


    render(){
        return(
            <div className="container-fluid">
                <div className="row sidemenu" >

                    <SideNavBar/>


                    <main role="main" className="col-sm-10">
                        <h1 className="header col-sm-8">Home</h1>
                        <h1 className="header ion-person col-sm-4" onClick={
                            event=> {this.showUserProfile}
                        }></h1>

                        <div className="col-sm-9">



                            <div style={ (this.state.mydirClicked) ? {display: "none"} :{}}>
                            <h2 className="header category">Shared with me</h2>
                            {/*<h2 className="header category" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>Shared with me</h2>*/}
                            <span style={ (this.state.sharedfiles.length>0) ? {display: "none"} :{}}>No Files</span>
                            <ul className="list-group" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>
                                {this.state.sharedfiles.map(file => (
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
                                                    isShared:true,
                                                    mydirClicked:false,


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
                                            {/*<button type="button" className="btn btn-secondary btnshare ion-android-star"  style={(file.isStar=== true) ? {} : { display: "none" }}*/}
                                                    {/*onClick={event => {*/}
                                                        {/*this.setState(*/}
                                                            {/*{*/}
                                                                {/*dirPath: file.path,*/}
                                                                {/*isStarred: file.isStar == true ? false : true*/}
                                                            {/*},*/}
                                                            {/*() => this.handleStar(this.state)*/}
                                                        {/*);*/}
                                                    {/*}}></button>*/}
                                            {/*<button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={(file.isStar=== false) ? {} : { display: "none" }}*/}
                                                    {/*onClick={event => {*/}
                                                        {/*this.setState(*/}
                                                            {/*{*/}
                                                                {/*dirPath: file.path,*/}
                                                                {/*isStarred: file.isStar === false ? true : false*/}
                                                            {/*},*/}
                                                            {/*() => this.handleStar(this.state)*/}
                                                        {/*);*/}
                                                    {/*}}></button>*/}
                                            {/*<button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" data-toggle="modal" data-target="#exampleModal"  style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                    {/*onClick={event => {*/}
                                                        {/*this.setState(*/}
                                                            {/*{ shareDirectoryPath: file.path, isDir: file.isDir },*/}
                                                            {/*// () => this.openModalShare(this.state)*/}
                                                        {/*);*/}
                                                    {/*}}></button>*/}
                                            {/*<button type="button" className="btn btn-secondary btnshare ion-ios-trash"   style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}*/}
                                                    {/*onClick={event => this.handleDelete(event, file.path)} ></button>*/}

                                            {/*<button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"  ></button>*/}
                                        </div>
                                    </li>
                                    // <li className="list-group-item">
                                    //     <span className="ion-ios-folder"></span>
                                    //     <span className="listContent">Cras justo odio</span>
                                    //     <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                    //         <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    //     </div>
                                    // </li>
                                    //
                                    // <li className="list-group-item">
                                    //     <span className="ion-ios-folder"></span>
                                    //     <span className="listContent">Cras justo odio</span>
                                    //     <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                    //         <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                    //         <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                    //     </div>
                                    // </li>
                                ))}
                            </ul>


                            <h2 className="header category" style={this.state.isShared ? {display: "none"}: {}}>My Files</h2>
                            <span style={ (this.state.files.length>0) ? {display: "none"} :{}}>No Files</span>
                            <ul className="list-group" style={this.state.isShared ? {display: "none"}: {}}>
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
                                        var subpath = file.path.replace("public/uploads/","");
                                        console.log("subpath@@@"+ subpath);

                                        this.setState(
                                            {
                                                dirPath: file.path,
                                                isShared:false,
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
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star"  style={(file.isStar=== true) ? {} : { display: "none" }}
                                                onClick={event => {
                                                    this.setState(
                                                        {
                                                            dirPath: file.path,
                                                            isStarred: file.isStar == true ? false : true
                                                        },
                                                        () => this.handleStar(this.state)
                                                    );
                                                }}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={(file.isStar=== false) ? {} : { display: "none" }}
                                                onClick={event => {
                                                    this.setState(
                                                        {
                                                            dirPath: file.path,
                                                            isStarred: file.isStar === false ? true : false
                                                        },
                                                        () => this.handleStar(this.state)
                                                    );
                                                }}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" data-toggle="modal" data-target="#exampleModal"  style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                onClick={event => {
                                                    this.setState(
                                                        { shareDirectoryPath: file.path, isDir: file.isDir, filefoldername:file.filefoldername },
                                                        // () => this.openModalShare(this.state)
                                                    );
                                                }}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash"   style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                onClick={event => this.handleDelete(event, file.path)} ></button>

                                        {/*<button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"  ></button>*/}
                                    </div>
                                </li>
                                // <li className="list-group-item">
                                //     <span className="ion-ios-folder"></span>
                                //     <span className="listContent">Cras justo odio</span>
                                //     <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                //         <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                //     </div>
                                // </li>
                                //
                                // <li className="list-group-item">
                                //     <span className="ion-ios-folder"></span>
                                //     <span className="listContent">Cras justo odio</span>
                                //     <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                //         <button type="button" className="btn btn-secondary btnshare ion-android-star"></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={{display:'none'}}></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" ></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-ios-trash" ></button>
                                //         <button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"></button>
                                //     </div>
                                // </li>
                                    ))}
                            </ul>

                            <h2 className="header category" style={this.state.isShared ? {display: "none"}: {}}>Starred</h2>
                            <ul className="list-group" style={this.state.isShared ? {display: "none"}: {}}>
                                {this.state.starred.map(file => (
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
                                                    isShared:false,
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
                                            <button type="button" className="btn btn-secondary btnshare ion-android-star"  style={(file.isStar=== true) ? {} : { display: "none" }}
                                                    onClick={event => {
                                                        this.setState(
                                                            {
                                                                dirPath: file.path,
                                                                isStarred: file.isStar == true ? false : true
                                                            },
                                                            () => this.handleStar(this.state)
                                                        );
                                                    }}></button>
                                            <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={(file.isStar=== false) ? {} : { display: "none" }}
                                                    onClick={event => {
                                                        this.setState(
                                                            {
                                                                dirPath: file.path,
                                                                isStarred: file.isStar === false ? true : false
                                                            },
                                                            () => this.handleStar(this.state)
                                                        );
                                                    }}></button>
                                            <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" data-toggle="modal" data-target="#exampleModal"  style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                    onClick={event => {
                                                        this.setState(
                                                            { shareDirectoryPath: file.path, isDir: file.isDir, filefoldername: file.filefoldername },
                                                            // () => this.openModalShare(this.state)
                                                        );
                                                    }}></button>
                                            <button type="button" className="btn btn-secondary btnshare ion-ios-trash"   style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                    onClick={event => this.handleDelete(event, file.path)} ></button>

                                            {/*<button type="button" className="btn btn-secondary btnshare ion-ios-cloud-download"  ></button>*/}
                                        </div>
                                    </li>
                                ))}
                            </ul>
</div>

                            <div style={ (this.state.mydirClicked) ? {} :{display: "none"}}>
                                <h2 className="header category">Files</h2>
                                {/*<h2 className="header category" style={ (!this.state.mydirClicked && this.state.sharedfiles.length>0) ? {} :{display: "none"}}>Shared with me</h2>*/}
                                <span style={ (this.state.filesUnderDir.length>0) ? {display: "none"} :{}}>No Files</span>
                                <ul className="list-group" style={ (this.state.mydirClicked && this.state.filesUnderDir.length>0) ? {} :{display: "none"}}>
                                    {this.state.filesUnderDir.map(file => (
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
                                                        file.isDir === true
                                                            ? {display: "none"}
                                                            : {}
                                                    }
                                                    download={file.filefoldername}
                                                >
                                                </a>
                                                <button type="button" className="btn btn-secondary btnshare ion-android-star"  style={(file.isStar=== true) ? {} : { display: "none" }}
                                                onClick={event => {
                                                this.setState(
                                                {
                                                dirPath: file.path,
                                                isStarred: file.isStar == true ? false : true
                                                },
                                                () => this.handleStar(this.state)
                                                );
                                                }}></button>
                                                <button type="button" className="btn btn-secondary btnshare ion-android-star-outline" style={(file.isStar=== false) ? {} : { display: "none" }}
                                                onClick={event => {
                                                this.setState(
                                                {
                                                dirPath: file.path,
                                                isStarred: file.isStar === false ? true : false
                                                },
                                                () => this.handleStar(this.state)
                                                );
                                                }}></button>
                                                <button type="button" className="btn btn-secondary btnshare ion-share" id="mymodal" data-toggle="modal" data-target="#exampleModal"  style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                onClick={event => {
                                                this.setState(
                                                { shareDirectoryPath: file.path, isDir: file.isDir },
                                                // () => this.openModalShare(this.state)
                                                );
                                                }}></button>
                                                <button type="button" className="btn btn-secondary btnshare ion-ios-trash"   style={file.username == localStorage.getItem("username") ? {} : { display: "none" }}
                                                onClick={event => this.handleDelete(event, file.path)} ></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>


                        <div className="col-sm-3 rightBlock" style={ (this.state.isShared) ? {display: "none"} :{}}>

                            {/*<button  className="btn uploadBtn"  type="file"*/}
                                    {/*name="myfile"*/}
                                    {/*onClick={this.handleFileUpload}>Upload Files</button>*/}
                            {/*<div className="rightDivTop rightDivLeft">*/}
                                {/*<b className="ion-ios-briefcase-outline"></b>*/}
                                {/*<span className="rightPane">New Shared Folder</span>*/}
                            {/*</div>*/}
                            {/*<div className="rightDivLeft">*/}
                                {/*<b className="ion-ios-folder-outline"></b>*/}
                                {/*<span className="rightPane">New  Folder</span>*/}
                            {/*</div>*/}
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
                            <div className="rightDivTop">
                            <span className="rightPane Uploadfile">Choose a file to upload</span>
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
                                    id="sharewith"
                                    name="sharewith"
                                    type="text"
                                    onChange={event => {
                                        this.setState({ shareWith: event.target.value });
                                    }}
                                    multiple
                                />
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.handleShare(this.state);
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

export default withRouter(HomePageBootstrap);
