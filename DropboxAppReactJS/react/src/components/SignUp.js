import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';

class SignUp extends Component {
    static propTypes = {
        //handleSignup: PropTypes.func.isRequired
    };

    state = {
        firstname: "",
        lastname: "",
        email:"",
        password:"",
        message:"",
        isFormValid: false
    };

    componentWillMount() {
        document.title = `Signup - Dropbox`;
        this.setState({
            firstname: "",
            lastname: "",
            email:"",
            password:"",
            message:"",
            isFormValid: false,
            firstnamerr: "",
            lastnameerr: "",
            emailerr:"",
            passworderr:""
        });
    }

    handleSignup = (userdata) => {
        console.log("first"+userdata.firstname);
        var emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

        if (userdata.firstname == null || userdata.firstname == "") {
            this.setState({
                isFormValid: false,
                firstnamerr: "First name cannot be empty!"
            });

        }
        else if(userdata.lastname == null || userdata.lastname == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr: "Last name cannot be empty!"
            });
        }
        else if(userdata.email == null || userdata.email == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr: "email cannot be empty!"
            });
        }
        else if(userdata.email != null &&  userdata.email != "" && (!emailRegex.test(userdata.email))) {
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr: "Invalid email!"
            });
        }

        else if(userdata.password == null || userdata.password == ""){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr:"",
                passworderr: "Password cannot be empty!"
            });
        }
        else if(userdata.password != null && userdata.password != "" && userdata.password.length<5){
            this.setState({
                isFormValid: false,
                firstnamerr:"",
                lastnameerr:"",
                emailerr:"",
                passworderr: "Password too short!!"
            });
        }
        else {

            //console.log("form validity" + this.state.isFormValid);
            // if (this.state.isFormValid || this.state.isFormValid == "true") {
                API.doSignUp(userdata)
                    .then((status) => {
                        if (status === 201) {
                            this.setState({
                                isLoggedIn: true,
                                 message: "!",
                                username: userdata.username
                            });
                            this.props.history.push("/login");
                        } else if (status === 401) {
                            this.setState({
                                isLoggedIn: false,
                                message: "Wrong username or password. Try again..!!"
                            });
                        }
                    });
            }
        //}

    };
    render() {
        return (
            <div>
                <header className="mast-head">
                    <div className="mast-head__container container">
                        <nav className="mast-head__nav mast-head-nav">
                            <ul className="nav-list">
                                <li className="nav-list__item nav-list__item--dfb"><a href="/business" id="try-dfb" className="button-tertiary try-dfb">Try Dropbox Business</a></li>
                            </ul>
                            <ul className="nav-list">
                                <li className="nav-list__item nav-list__item--download"><a href="/downloading?src=index" className="button-link">Download the app</a></li>
                            </ul>
                        </nav>
                        <h1 id="dropbox-logo" className="dropbox-logo"><a href="/" className="dropbox-logo__link"><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" alt="" className="dropbox-logo__glyph"/><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" alt="" className="dropbox-logo__type"/>Dropbox</a></h1>
                    </div>
                </header>
                <div className="outer-frame">
                    <div className="page-content">
                        <div className="main-skip-destination">
                            <div className="login-or-register-page-content">
                                <div className="login-or-register-outer">
                                    <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" alt="" className="login-or-register-img"/>
                                    <div  id="pyxl3582989222650193393" className="login-register-container">
                                        <div className="clearfix">
                                            <div className="login-register-header">Create an account</div>
                                            <div className="login-register-switch">or <a href="/login" className="login-register-switch-link">login</a></div>
                                        </div>
                                        <div className="dummy-height"></div>
                                        <div className="login-form-container">
                                            <div className="login-form-container__google-div">
                                                {/*<div className="auth-google button-primary">*/}
                                                    {/*<div className="sign-in-text">Sign in with Google</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="hr-label"><span className="hr-label__text">or</span></div>*/}
                                                <div className="login-form-width">
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.firstnamerr}</span></font>

                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="text" name="login_firstname" id="pyxl8995788599097555052" placeholder="First name" onChange={event=>{this.setState({firstname:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.lastnameerr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="text" name="login_lastname" id="pyxl8995788599097555052" placeholder="Last name" onChange={event=>{this.setState({lastname:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.emailerr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="email" name="login_email" id="pyxl8995788599097555052" placeholder="Email" onChange={event=>{this.setState({email:event.target.value});}}/>
                                                    </div>
                                                    <div className="dummy-height"></div>
                                                    <font color="red"> <span>{this.state.passworderr}</span></font>
                                                    <div className="text-input-wrapper">
                                                        <input className="text-input-input autofocus" type="password" name="login_password" id="pyxl8995788599097555052" placeholder="Password" onChange={event=>{this.setState({password:event.target.value});}}/>
                                                    </div>
                                                    <div className="clearfix">
                                                        <button type="submit" className="login-button button-primary" onClick={()=>this.handleSignup(this.state)}><div className="sign-in-text">Create an account</div><div className="sso-text">Continue</div></button>                                    </div>
                                                </div>
                                                <div className="hr-label"><span className="hr-label__text">or</span></div>
                                                <div className="auth-google button-primary">
                                                    <div className="sign-in-text">Sign in with Google</div>
                                                </div>
                                                <div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<Message message={this.state.message}/>*/}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default withRouter(SignUp);
