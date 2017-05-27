import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setJourney } from '../actions'
import { hashHistory } from 'react-router';
import Loading from 'react-loading';
import axios from 'axios';
class BookingItem extends Component {

    constructor(){
        super();
        this.state = {
            booking: null
        }
    }
    componentWillMount(){
        if(!this.props.DB.signed){
            hashHistory.push('/');
        }
        const{ member_id, journey_id } = this.props.params;
        axios.get(`api/Booking/${member_id}/${journey_id}`)
            .then(res => this.setState({booking: res.data[0]}))
            .catch( err => console.log(err));

    }
    componentWillUnmount(){
        //reset journeys;
    }

    render(){
        const { booking } = this.state;
        const { family_name, given_names, title } = this.props.DB;
        if(booking !== null ){
            const { booked_by, date, depart_time, from, to, vehicle_code, when_booked } = booking;
            let dt = date.replace(".000Z", "");
            let dat = dt.split('T')[0];
            let time = dt.split('T')[1];
            return(
            <div className="card">
                <h2>Booking for {title} {family_name} </h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Member Name</td>
                        <td>{title} {given_names} {family_name} </td>
                    </tr>
                    <tr>
                        <td>Vehicle Code</td>
                        <td>{vehicle_code}</td>
                    </tr>
                    <tr>
                        <td>Start Information</td>
                        <td>{dat} @ {time}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{dat}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{time}</td>
                    </tr>
                    <tr>
                        <td>To</td>
                        <td>{to}</td>
                    </tr>
                    <tr>
                        <td>From</td>
                        <td>{from}</td>
                    </tr>
                    <tr>
                        <td>Booked By</td>
                        <td>{booked_by}</td>
                    </tr>
                    <tr>
                        <td>Booked On</td>
                        <td>{when_booked.split('T')[0]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
        }else{
            return  <Loading type={'spin'} color={'white'} height={100} width={100} />
        }
        
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(BookingItem);