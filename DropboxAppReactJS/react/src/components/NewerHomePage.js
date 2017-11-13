import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import ActivityReport from "./ActivityReport";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomePageBootstrap from "./HomePageBootstrap";
import UserProfile from "./UserProfile";
import Groups from './Groups';


class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        messageemail: '',
        messagepwd: '',
        message:'',
        username: '',
        isFormValid :false
    };


    handleLogin = (userdata) => {

        {
            var emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if(userdata.username == null || userdata.username == "")
            {
                this.setState({
                    isLoggedIn: false,
                    messageemail: "Please enter an email",
                    messagepwd: "",
                    message:""
                });
            }
            else if(userdata.username != null &&  userdata.username != "" && !emailRegex.test(userdata.username)) {
                    this.setState({
                        isLoggedIn: false,
                        messageemail: "Invalid Email!",
                        messagepwd: "",
                        message:""
                    });
            }
            else if(userdata.password == null || userdata.password == "")
            {
                this.setState({
                    isLoggedIn: false,
                    messagepwd: "Please enter password",
                    messageemail: "",
                    message: ""
                });
            }

            else
            {
                API.doLogin(userdata)
                    .then((status) => {
                        localStorage.setItem("username",status.sessiondata);
                        console.log("status********"+JSON.stringify(status.user));
                        console.log("session___________"+JSON.stringify(status.sessiondata));

                        if (status.user != "error" ) {
                            this.setState({
                                isLoggedIn: true,
                                //message: "Welcome to my App..!!",
                                username: status.user.username,
                                firstname: status.user.firstname,
                                lastname:status.user.lastname,
                                messagepwd: "",
                                messageemail: "",
                            });
                            this.props.history.push("/home");
                        } else {
                            this.setState({
                                isLoggedIn: false,
                                message: "Wrong username or password. Try again..!!"
                            });
                        }
                    });
            }
        }

    };


    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/login");
                }
            });
    };


    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div>
                        <Login handleLogin={this.handleLogin} message={this.state.message} messageemail={this.state.messageemail} messagepwd={this.state.messagepwd}/>
                        {/*<Message message={this.state.message}/>*/}
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleLogin={this.handleLogin} message={this.state.message} messageemail={this.state.messageemail} messagepwd={this.state.messagepwd}/>
                        {/*<Message message={this.state.message}/>*/}
                    </div>
                )}/>

                <Route exact path="/activityReport" render={() => (
                    <ActivityReport/>
                )}/>

                <Route exact path="/userprofile" render={() => (
                    <div>
                    <UserProfile/>
                    </div>
                )}/>

                <Route path="/signup" render={() => (
                    <div>
                    <SignUp handleSignup = {this.handleSignup} />
                    </div>
                )}/>

                <Route exact path="/interests" render={() => (
                    <Interests/>
                )}/>
                <Route exact path="/groups" render={() => (
                    <Groups username={localStorage.getItem("username")}/>
                )}/>
                <Route exact path="/home" render={() => (

                    <div>
                        <HomePageBootstrap handleLogout={this.handleLogout} username={localStorage.getItem("username")}/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);