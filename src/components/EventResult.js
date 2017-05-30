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
    render(){
      
        console.log(this.state);
            return(
            <div className="card">
             <h2>Results </h2>
                {this.renderAthletes()}
            </div>
        )
        
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(BookingItem);