import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookings} from '../actions'
import { hashHistory, Link } from 'react-router';
import axios from 'axios';
class Bookings extends Component {

    constructor(){
        super();
        this.state = {
            createBooking : false,
            journeys: [],
            success: null,
            err: null
        }
    }
    componentWillMount(){
        if(!this.props.DB.signed){
            return hashHistory.push('/');
        }
        const { member_id } = this.props.DB;
        this.props.getBookings(member_id);
    }
    componentWillUnmount(){
       
    }

    handleBooking(e){
        let forId = e.target.for_id.value;
        let journey = e.target.jounrey_id.value;
        let { member_id } = this.props.DB;
        this.setState({ err: null, success: null});
        let booking = { bookedFor: forId, journeyID: journey, bookedBy: member_id };
        axios.post("/api/create/booking", {booking})
            .then( res => {
                this.setState({createBooking : false});
                this.props.getBookings(member_id);
                this.setState({ success : <p style={{ 'color': 'green', 'fontWeight': '600' }}> Booking Successfully Created</p>})
            })
            .catch( err => {
                this.setState({createBooking : false});
                this.setState({err: <p style={{ 'color': 'red', 'fontWeight': '600' }}> Failed to create booking </p>})
            });
        e.preventDefault();
    }

    renderBooking(){
        const { type } = this.props.DB;
        const { createBooking, journeys } = this.state;
        if( type === 'Staff' && createBooking){
            axios.get('api/journeys')
                .then(response => this.setState({journeys: response.data}))
                .catch( err => console.log(err));
            return(
                <form className="Search" onSubmit={ this.handleBooking.bind(this) }>
                         <input className="field" id="for_id" placeholder="A000021705" type="text" required="required" />
                         <br/>
                         <input id="jounrey_id" className="field" list="journey" placeholder="Search Journeys" type="text" required="required" />
                        <datalist id="journey">
                            { journeys.map( journey => {
                                    const {to_place, from_place, journey_id } = journey;
                                    return  <option key={journey_id} value={journey_id}>From {to_place} To {from_place}</option>
                                })
                            }
                    </datalist>
                    <br />
                    <div>
                        <button id="submit-booking" type="submit" className='button'>Submit Booking</button>
                    </div>
                </form>
            )
        }
    }
    render(){
        const { bookings, member_id, type } = this.props.DB;
        const error = (bookings.length === 0) ? <div className='error'><h3 id='error'> No Bookings found </h3></div> : null;
        const booking = ( type === 'Staff' ) ? <a href="#submit-booking"><button onClick={() => this.setState({createBooking : true})} className='button'>Make Booking</button></a> : null;
        let { success, err} = this.state;
        return(
            <div className="module-container">
            <div className="card" id="booking-card">
                <h2>My Bookings</h2>
                {error}
                <table cellSpacing="0">
                    <tbody>
                        <tr id="header">
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>To</th>
                            <th>From</th>
                            <th>Vehicle</th>
                        </tr>
                        {  
                            bookings.map( booking => {
                                let dt = booking.depart_time.replace(".000Z", "");
                                let date = dt.split('T')[0];
                                let time = dt.split('T')[1];
                                return (
                                    <tr key={Math.random()} className="dr">
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>{booking.to_place}</td>
                                        <td>{booking.from_place}</td>
                                        <td>{booking.vehicle_code}</td>
                                        <td><Link to={`/Booking/${member_id}/${booking.journey_id}`}><button className='button'>View Details</button></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                    { this.renderBooking() }
                    { success }
                    { err }
                </div>
                { booking }
            
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {getBookings})(Bookings);