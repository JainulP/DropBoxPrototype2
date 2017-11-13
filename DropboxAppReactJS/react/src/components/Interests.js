import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import { withRouter } from 'react-router-dom';
import SideNavBar from "./SideNavBar";
import '.././CSS/homepagecss.css';

class Interests extends Component
{

    constructor() {
        super();
        this.state = {
            music : [],
            shows:[],
            sports:[],
            isEdit:false
        };
        this.updateUserInterest = this.updateUserInterest.bind(this);

    }

    componentWillMount() {


        API.getUserInterests()
            .then((data) => {
                console.log("user interest" + JSON.stringify(data));
                this.setState({
                    music: data.music,
                    shows: data.shows,
                    sports: data.sports

                });
            });

    }



    updateUserInterest = (data) => {
        API.updateUserInterest(data)
            .then((status) => {
                if (status === 201) {
                    API.getUserInterests()
                        .then((data) => {
                            this.setState({
                                music: data.music,
                                shows: data.shows,
                                sports: data.sports
                            });
                        });
                }
            });
    };
    render(){
        return(
            <div className="container-fluid">
                {/*<main role="main" className="col-sm-10">*/}
                <div className="row sidemenu" >
                    <SideNavBar/>
                    <main role="main" className="col-sm-10">
                        <form style={(this.state.isEdit) ? {display:"block"}: {display:"none"}}>
                            {/*<form >*/}
                            <div className="col-md-12">
                                <h1 className="header"> Music </h1>
                                <hr/>

                                <div className="col-md-12">
                                <input type="text" className="form-control" id="music" placeholder="" onChange={event => {
                                    this.setState({
                                        music: event.target.value
                                    });
                                }}/>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Shows </h1>
                                <hr/>

                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="shows" placeholder="" onChange={event => {
                                        this.setState({
                                            shows: event.target.value
                                        });
                                    }}/>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Sports </h1>
                                <hr/>

                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="sports" placeholder="" onChange={event => {
                                        this.setState({
                                            sports: event.target.value
                                        });
                                    }}/>
                                </div>
                                <br/>
                            </div>


                            <div>
                                <button type="submit" className="btn btn-primary rightDivTop"  onClick={(event) => {
                                    this.updateUserInterest(this.state)}}>Submit</button>
                            </div>


                        </form>

                        <form style={(this.state.isEdit) ? {display:"none"}: {}}>

                            <div className="col-md-12">
                                <h1 className="header"> Music </h1>
                                <hr/>

                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.music}</h2>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Shows </h1>
                                <hr/>
                                <div className="col-md-10">
                                    <h2 className="labelprofile"> {this.state.shows}</h2>
                                </div>

                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Sports </h1>
                                <hr/>
                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.sports}</h2>
                                </div>
                                <br/>
                            </div>

                            <div>
                                <button type="button" className="btn btn-primary rightDivTop"  onClick={(event) => { this.setState({isEdit:true})
                                }}>Edit</button>
                            </div>

                        </form>
                    </main>
                </div>
            </div>
        );

    }
}

export default Interests;