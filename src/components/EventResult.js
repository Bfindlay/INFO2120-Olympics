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
         event: null
        }
    }
    componentWillMount(){
        const{ id } = this.props.params;
        axios.get(`api/event/result/${id}`)
            .then(res => this.setState({event: res.data}))
            .catch( err => console.log(err));

    }

    renderAthletes(){
        const { event } = this.state;
        if( event !== null){
            const { athletes } = event;
            return(
                <table>
                        <thead>
                            <tr id="header">
                                <th>Member ID</th>
                                <th>Result</th>
                                <th>Medal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                athletes.map( a => {
                                    const { member_id, medal} = a;
                                    return (
                                        <tr key={Math.random()} className="dr">
                                            <td>{member_id}</td>
                                            <td>result ? </td>
                                            <td>{medal}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            )
        }   
    }

    renderTitle(){
        const { event } = this.state;
        if(event !== null)
        return (
            <div>
                <h2>Information</h2>
                <table>
                    <tr>
                        <td>Event Name</td>
                        <td> { event.athletes[0].event_name }</td>
                    </tr>
                    <tr>
                        <td>Sport</td>
                        <td>{ event.athletes[0].discipline }</td>
                    </tr>
                    <tr>
                        <td> Start Time </td>
                        <td> { event.athletes[0].event_start }</td>
                    </tr>
                    <tr>
                        <td> Venue</td>
                        <td> { event.athletes[0].place_name }</td>
                    </tr>
                </table>
            </div>
        )
    }

    renderOfficials(){
        const { event } = this.state;
        if( event !== null){
            const { officials } = event;
            return(
                <table>
                        <thead>
                            <tr id="header">
                                <th>Member ID</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                officials.map( o => {
                                    const { member_id, role} = o;
                                    return (
                                        <tr key={Math.random()} className="dr">
                                            <td>{member_id}</td>
                                            <td>{role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            )
        }   
    }
    
    render(){
        return(
            <div className="card">
                {this.renderTitle()}
                <h2>Results </h2>
                {this.renderAthletes()}
                <h2>Officials </h2>
                {this.renderOfficials()}
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(BookingItem);