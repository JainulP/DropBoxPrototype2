import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import { withRouter } from 'react-router-dom';
import SideNavBar from "./SideNavBar";
import '.././CSS/homepagecss.css';


class UserProfile extends  Component
{

    constructor() {
        super();
        this.state = {
            overview : '',
           position:'',
            employer:'',
            location:'',
            degree:'',
            university:'',
            contactnumber:'',
            address: '',
            city:'',
            state:'',
            zip:'',
            isEdit: false,
            userdata: ''
        };
        // this.updateUserProfile = this.updateUserProfile.bind(this);

    }

    componentDidUpdate(){

    }
    componentWillMount() {
        console.log("mount called"+this.state.isEdit);
        // if (this.refs.myref) {
            API.getUserProfile()
                .then((data) => {
                    console.log("user profrle" + JSON.stringify(data));
                    this.setState({
                        overview: data.overview,
                        position: data.position,
                        employer: data.employer,
                        location: data.location,
                        degree: data.degree,
                        university: data.university,
                        contactnumber: data.contactnumber,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        zip: data.zip,
                        userdata: data

                    });
                    console.log("state val"+ this.state.overview);
                });

        }
    //}

    componentDidMount()
    {



    }


    updateUserProfile = (data) => {
        API.updateUserProfile(data)
            .then((status) => {
                if (status === 200) {
                    API.getUserProfile()
                        .then((data) => {
                            this.setState({
                                overview : data.overview,
                                position:data.position,
                                employer:data.employer,
                                location:data.location,
                                degree:data.degree,
                                university:data.university,
                                contactnumber:data.contactnumber,
                                address: data.address,
                                city:data.city,
                                state:data.state,
                                zip:data.zip
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
            <form style={(this.state.isEdit === true) ? {}: {display:"none"}}>
                    {/*<form >*/}
            <div className="col-md-12">
                <h1 className="header"> Overview </h1>
                <hr/>
                <div className="col-md-2">
                    <h2 className="labelprofile"> User Overview</h2>
                </div>

                <div className="col-md-10">
                    <textarea type="text" className="form-control" id="overview" placeholder="" onChange={event => {
                        this.setState({
                            overview: event.target.value
                        });
                    }}/>
                </div>
                <br/>
            </div>

                <div className="col-md-12">
                <h1 className="header"> Work </h1>
                <hr/>
                <div className="col-md-2">
                    <h2 className="labelprofile"> Position</h2>
                    <br/>
                    <h2 className="labelprofile"> Employer</h2> <br/>
                    <h2 className="labelprofile"> Location</h2>
                </div>
                <div className="col-md-10">
                    <input type="text" className="form-control" id="position" placeholder="" onChange={event => {
                        this.setState({
                            position: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="employer" placeholder="" onChange={event => {
                        this.setState({
                            employer: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="location" placeholder="" onChange={event => {
                        this.setState({
                            location: event.target.value
                        });
                    }}/>
                </div>
                <br/>
                </div>

                <div className="col-md-12">
                <h1 className="header"> Education </h1>
                <hr/>
                <div className="col-md-2">
                    <h2 className="labelprofile"> Highest Degree</h2>
                    <br/>
                    <h2 className="labelprofile"> University Name</h2>
                </div>

                <div className="col-md-10">
                    <input type="text" className="form-control" id="degree" placeholder="" onChange={event => {
                        this.setState({
                            degree: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="university" placeholder="" onChange={event => {
                        this.setState({
                            university: event.target.value
                        });
                    }}/>
                </div>
                <br/>
                </div>

                <div className="col-md-12">
                <h1 className="header"> Contact Information </h1>
                <hr/>
                <div className="col-md-2">
                    <h2 className="labelprofile"> Contact Number</h2> <br/>
                    <h2 className="labelprofile"> Address</h2> <br/>
                    <h2 className="labelprofile"> City</h2> <br/>
                    <h2 className="labelprofile"> State</h2> <br/>
                    <h2 className="labelprofile"> Zip</h2>

                </div>

                <div className="col-md-10">
                    <input type="text" className="form-control" id="contactnum" placeholder="xxx-xxx-xxxx" onChange={event => {
                        this.setState({
                            contactnumber: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={event => {
                        this.setState({
                            address: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="inputcity" placeholder="" onChange={event => {
                        this.setState({
                            city: event.target.value
                        });
                    }}/>
                <br/>
                    <input type="text" className="form-control" id="State" placeholder="" onChange={event => {
                        this.setState({
                            state: event.target.value
                        });
                    }}/>
                    <br/>
                    <input type="text" className="form-control" id="Zip" placeholder="" onChange={event => {
                        this.setState({
                            zip: event.target.value
                        });
                    }}/>
                    <br/>
                </div>
                <br/>
                </div>
                <div>
                <button type="submit" className="btn btn-primary rightDivTop"  onClick={(event) => {
                    this.updateUserProfile(this.state)}}>Submit</button>
                </div>


            </form>

                    <form style={(this.state.isEdit == true) ? {display:"none"}: {}}>

                            <div className="col-md-12">
                                <h1 className="header"> Overview </h1>
                                <hr/>
                                <div className="col-md-2">
                                    <h2 className="labelprofile"> User Overview</h2>
                                </div>

                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.overview}</h2>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Work </h1>
                                <hr/>
                                <div className="col-md-2">
                                    <h2 className="labelprofile"> Position</h2>
                                    <br/>
                                    <h2 className="labelprofile"> Employer</h2> <br/>
                                    <h2 className="labelprofile"> Location</h2>
                                </div>
                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.position}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.employer}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.location}</h2>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Education </h1>
                                <hr/>
                                <div className="col-md-2">
                                    <h2 className="labelprofile"> Highest Degree</h2>
                                    <br/>
                                    <h2 className="labelprofile"> University Name</h2>
                                </div>

                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.degree}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.university}</h2>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-12">
                                <h1 className="header"> Contact Information </h1>
                                <hr/>
                                <div className="col-md-2">
                                    <h2 className="labelprofile"> Contact Number</h2> <br/>
                                    <h2 className="labelprofile"> Address</h2> <br/>
                                    <h2 className="labelprofile"> City</h2> <br/>
                                    <h2 className="labelprofile"> State</h2> <br/>
                                    <h2 className="labelprofile"> Zip</h2>

                                </div>

                                <div className="col-md-10">
                                    <h2 className="labelprofile">{this.state.contactnumber}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.address}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.city}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.state}</h2>
                                    <br/>
                                    <h2 className="labelprofile">{this.state.zip}</h2>
                                    <br/>
                                </div>
                                <br/>
                            </div>

                        <div>
                            <button type="button" className="btn btn-primary rightDivTop"  onClick={() => { this.setState({isEdit: true});}}>Edit</button>
                        </div>

                    </form>
                </main>
                </div>
                 </div>
        );

    }
}

export default withRouter(UserProfile);