import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberDetails, getBookings } from '../actions';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';
class Details extends Component {

    constructor(){
        super();
    }

    componentWillMount(){
        const { signed, member_id } = this.props.DB;
        if(!signed){
            return hashHistory.push('/');
        }
        this.props.getBookings(member_id);
    }

    render(){
        const{ country_code, family_name, given_names, member_id, title, accommodation, type, bookings } = this.props.DB;
        return(
            <div>
                 <div className="details-container">
                    <h1> Details </h1>
                    <div className="details-module">
                        <h3>Member ID: {member_id}</h3>
                        <h3>Name: {title} {given_names} {family_name}</h3>
                        <h3>Type: {type} for {country_code}</h3>
                        <h3>Accommodation: {accommodation}</h3>
                        <h3>Bookings: {bookings.length} </h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {memberDetails, getBookings})(Details);