import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberDetails } from '../actions';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';
class Details extends Component {

    constructor(){
        super();
    }

    render(){
        const{ country_code, family_name, given_names, member_id, title, accommodation } = this.props.DB;
        console.log(accommodation);
        return(
            <div>
                 <div className="details-container">
                    <h1> Details </h1>
                    <div className="details-module">
                        <h3>Member ID: {member_id}</h3>
                        <h3>Name: {title} {given_names} {family_name}</h3>
                        <h3>Type: {member_id} for {country_code}</h3>
                        <h3>Accommodation: {accommodation}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {memberDetails})(Details);