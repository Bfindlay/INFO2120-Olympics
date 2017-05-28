import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import axios from 'axios';

class Events extends Component{

    constructor(){
        super();
        this.state = {
            search: '',
            events: [],
            min: 0,
            max: 15
        }
    }

    handleSubmit(){
        const { search } = this.state;
        axios.get(`api/events/${search}`)
            .then( res => this.setState({events : res.data}))
            .catch( err => console.log(err));
    }

    renderList(){
        const { events, search, min, max } = this.state;
        let limited = events.slice(min, max);
        if(limited.length === 0)
            return null;
        return(
            <div className="card">
                    <table className="styled">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start</th>
                                <th>Sport</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                        { limited.map( e => {
                            const { discipline, event, sport, event_start, place_name} = e;
                            let time = event_start.replace(":00.000Z", "").split('T')[1];
                            return(
                                <tr key={Math.random()}>
                                    <td><a href="/eventdetails/?eventname=200M+Freestyle">{event}</a></td>
                                    <td>{time}</td>
                                    <td>{discipline}</td>
                                    <td>{place_name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
        )
    }
    render(){
        return(
            <div className="events">
                <div className='search-container' onSubmit={this.handleSubmit.bind(this)}>
                    <form className="Search">
                        <input className="Search-box" onChange={({target}) => this.setState({search: target.value})} placeholder="Search Sport" type="search" id="Search-box" autoComplete="off" />
                        <label className="Search-label" htmlFor="Search-box"><i className="fa fa-search"></i></label>
                    </form>
                </div>
                { this.renderList() }
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {})(Events);
