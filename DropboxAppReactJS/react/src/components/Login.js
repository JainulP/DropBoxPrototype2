import React, { Component } from "react";
import {  withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import '.././CSS/login.css';


class Login extends Component {
    static propTypes = {
        handleLogin: PropTypes.func.isRequired
    };

    state = {
        username: "",
        password: ""
    };

    componentWillMount() {
        document.title = `Login - Dropbox`;
        this.setState({
            username: "",
            password: ""
        });
        // var username = localStorage.getItem("username");
        // if(username != null)
        // {
        //     this.props.history.push("/home");
        // }
    }


    render() {
        return (
            <div>
                {/*<div className="row justify-content-md-center">*/}
              <header className="mast-head">
                <div className="mast-head__container container">
                  <nav className="mast-head__nav mast-head-nav">
                    <ul className="nav-list">
                      <li className="nav-list__item nav-list__item--dfb"><a href="#" id="try-dfb" className="button-tertiary try-dfb">Try Dropbox Business</a></li>
                    </ul>
                    <ul className="nav-list">
                      <li className="nav-list__item nav-list__item--download"><a href="#" className="button-link">Download the app</a></li>
                    </ul>
                  </nav>
                  <h1 id="dropbox-logo" className="dropbox-logo"><a href="/" className="dropbox-logo__link"><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" alt="" className="dropbox-logo__glyph"/><img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" alt="" className="dropbox-logo__type"/>Dropbox</a></h1>
                </div>
              </header>
                {/*<div className="col-md-3">*/}
              <div className="outer-frame">
                <div className="page-content">
                  <div className="main-skip-destination">
                    <div className="login-or-register-page-content">
                      <div className="login-or-register-outer">
                        <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" alt="" className="login-or-register-img"/>
                        <div  id="pyxl3582989222650193393" className="login-register-container">
                          <div className="clearfix">
                            <div className="login-register-header">Sign in</div>
                            <div className="login-register-switch">or <a href="/signup" className="login-register-switch-link">create an account</a></div>
                          </div>
                          <div className="dummy-height"></div>
                          <div className="login-form-container">
                            <div className="login-form-container__google-div">
                              <div className="auth-google button-primary">
                                <div className="sign-in-text">Sign in with Google</div>
                              </div>
                              <div className="hr-label"><span className="hr-label__text">or</span></div>
                              <div className="login-form-width">
                                <div className="dummy-height"></div>
                                  <font color="red"> <span>{this.props.messageemail}</span></font>
                                <div className="text-input-wrapper">
                                  <input className="text-input-input autofocus" type="email" name="login_email" id="pyxl8995788599097555052" placeholder="Email" onChange={event=>{this.setState({username:event.target.value});}}/>
                                </div>
                                <div className="dummy-height"></div>
                                <div className="text-input-wrapper">
                                    <font color="red"> <span>{this.props.messagepwd}</span></font>
                                  <input className="text-input-input autofocus" type="password" name="login_password" id="pyxl8995788599097555052" placeholder="Password" onChange={event=>{this.setState({password:event.target.value});}}/>
                                </div>
                                <div className="clearfix">
                                  <button type="submit" className="login-button button-primary" onClick={()=>this.props.handleLogin(this.state)}><div className="sign-in-text">Sign in</div><div className="sso-text">Continue</div></button>                                    </div>
                              </div>
                                <font color="red"> <span>{this.props.message}</span></font>
                                {/*<span>{this.props.message}</span>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}

// export default Login;
export default withRouter(Login);