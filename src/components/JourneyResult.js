import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setJourney } from '../actions'
import { hashHistory } from 'react-router';

class JourneyResult extends Component {

    constructor(){
        super();
    }
    componentWillMount(){
        if(!this.props.DB.signed){
            hashHistory.push('/');
        }
    }
    componentWillUnmount(){
        //reset journeys;
        this.props.setJourney([]);
    }

    render(){
        const { to, from, date } = this.props.params;
        const { journeys } = this.props.DB;
        const error = (journeys.length === 0) ? <div className='error'><h3 id='error'> No Journeys Found for search paramaters </h3></div> : null;

        return(
            <div className="card">
                <h2>Journeys:</h2>
                <h3>To: {to}  From: {from} on {date}</h3>
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
                            journeys.map( journey => {
                            let dt = journey.depart_time.replace(".000Z", "");
                            let date = dt.split('T')[0];
                            let time = dt.split('T')[1];
                            return (
                                <tr key={Math.random()} className="dr">
                                    <td>{date}</td>
                                    <td>{time}</td>
                                    <td>{journey.to_place}</td>
                                    <td>{journey.from_place}</td>
                                    <td>{journey.vehicle_code}</td>
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
export default connect(mapStateToProps, {setJourney})(JourneyResult);