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
            jounreys: []
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

    renderBooking(){
        const { type } = this.props.DB;
        const { createBooking, journeys  } = this.state;
        if( type === 'Staff' && createBooking){
            axios.get('api/journeys')
                .then(response => this.setState({journeys: response.data}))
                .catch( err => console.log(err));
            return(
                <form className="Search">
                         <input className="field" placeholder="A000021705" type="text" required="required" />
                         <br/>
                         <input id="fromSelected" className="field" list="journey" placeholder="Search Journeys" type="text" required="required" />
                        <datalist id="journey">
                            { journeys.map( journey => {
                                    const {to_place, from_place, journey_id } = journey;
                                    return  <option key={journey_id} value={journey_id}>From {to_place} To {from_place}</option>
                                })
                            }
                    </datalist>
                    <br />
                    <div className='load-button'>
                        <button onClick={() => this.setState({createBooking : true})} className='button'>Submit Booking</button>
                    </div>
                    
                </form>
            )
        }
    }
    render(){
        const { bookings, member_id, type } = this.props.DB;
        const error = (bookings.length === 0) ? <div className='error'><h3 id='error'> No Bookings found </h3></div> : null;
        const booking = ( type === 'Staff' ) ? <button onClick={() => this.setState({createBooking : true})} className='button'>Make Booking</button> : null;
        return(
            <div>
            <div className="card">
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
                </div>
                { booking }
            
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {getBookings})(Bookings);