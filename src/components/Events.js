import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import axios from 'axios';

class Events extends Component{

    constructor(){
        super();
        this.state = {
            search: '',
            events: []
        }
    }

    componentWillMount(){
        
    }

    handleSubmit(){
        console.log("submit");
        const { search } = this.state;
        axios.get(`api/events/${search}`)
            .then( res => {
                console.log(res);
                this.setState({events : res.data})})
            .catch( err => console.log(err));
    }
    render(){
       const { events, search } = this.state;
        return(
            <div>
                <div className='search-container' onSubmit={this.handleSubmit.bind(this)}>
                    <form className="Search">
                        <input className="Search-box" onChange={({target}) => this.setState({search: target.value})} placeholder="Search Sport" type="search" id="Search-box" autoComplete="off" />
                        <label className="Search-label" htmlFor="Search-box"><i className="fa fa-search"></i></label>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {})(Events);
