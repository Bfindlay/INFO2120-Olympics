import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setJourney } from '../actions'
import { hashHistory } from 'react-router';

class JourneyResult extends Component {

    constructor(){
        super();
    }
    componentWillMount(){
        if(this.props.DB.journey === []){
           // hashHistory.push('Journey');
        }
    }
    componentWillUnmount(){
        //reset journeys;
        this.props.setJourney([]);
    }

    render(){
        const { to, from, date } = this.props.params;
        return(
            <div className="card">
                <h2>Journeys: {to} - {from} on {date}</h2>
                <table cellSpacing="0">
                    <tbody>
                        <tr id="header">
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>To</th>
                            <th>From</th>
                            <th>Vehicle</th>
                        </tr>
                        <tr className="dr">
                            <td> <a href="#">5795448</a></td>
                            <td>9/6/2016</td>
                            <td>Jon Snow</td>
                            <td>HO</td>
                            <td>9/6/2016</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {setJourney})(JourneyResult);