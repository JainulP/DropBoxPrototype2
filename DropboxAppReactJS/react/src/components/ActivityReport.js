import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import SideNavBar from "./SideNavBar";

class ActivityReport extends Component {


    constructor() {
        super();
        this.state = {
            activities: []
        };
    }
    componentWillMount() {



            API.getActivityReport(localStorage.getItem("username"))
                .then((data) => {console.log("initial activity"+data);
                    // if (this.refs.myref) {
                        this.setState({
                            activities: data
                        });
                    //}
                });





    };
    render(){
        return(
            <div className="container-fluid">
                <div className="row sidemenu" >

                    <SideNavBar/>


                    <main role="main" className="col-sm-10">
                        <h1 className="header col-sm-8">Activities</h1>
                        <div className="col-sm-9">
                        <ul className="list-group">
                            {this.state.activities.map(activity => (
                            <li className="list-group-item row">

                                <div>{activity.username}  {activity.event} {activity.foldername} at {activity.time}</div>

                            </li>

                                ))}
                        </ul>
                    </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default ActivityReport;