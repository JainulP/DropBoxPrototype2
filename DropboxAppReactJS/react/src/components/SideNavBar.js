import React, { Component } from "react";
import * as API from '../api/API';
import { withRouter } from 'react-router-dom';
import '.././CSS/homepagecss.css';

class SideNavBar extends  Component{

    constructor() {
        super();
        this.state = {
            username : ''
        };
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = (event) => {
        console.log("handle log out called");
        localStorage.clear();
        this.setState({
            username: ""
        });
        console.log("afterlogout"+localStorage.getItem("username"));
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
            <nav className="col-sm-2 bg-light profile-sidebar">
                <div className="profile-userpic">
                    <img className="maestro-nav__logo" aria-label="Home" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg" role="img"  data-reactid="12"/>
                </div>
                <ul className="nav nav-pills flex-column firstelement">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/groups">Groups</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/userprofile">User Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/interests">User Interests</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/activityReport">Activity Report</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login" onClick={this.handleLogout}>Logout</a>
                    </li>
                </ul>

            </nav>
        );
    }
}

export default withRouter(SideNavBar);