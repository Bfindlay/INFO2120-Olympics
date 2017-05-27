import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookings} from '../actions'
import { hashHistory } from 'react-router';

class Bookings extends Component {

    constructor(){
        super();
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

    render(){
        const { bookings } = this.props.DB;
        const error = (bookings.length === 0) ? <div className='error'><h3 id='error'> No Bookings found </h3></div> : null;
        console.log(bookings)
        return(
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
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {getBookings})(Bookings);