import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
class NavBar extends Component {

    constructor(){
        super();
    }
    
    render(){
        return(
            <div className='navbar'>
                <div className='title' onClick={() => hashHistory.push('/')}>
                    <h1> Olympics App </h1>
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <h3 href="#home">My Details</h3>
                        </li>
                        <li>
                            <h3 href="#about">Events</h3>
                        </li>
                        <li>
                            <h3 href="#contact">My Bookings</h3>
                        </li>
                        <li>
                            <h3 href="#contact">Journey</h3>
                        </li>
                        <li>
                            <h3 href="#contact">Log Out</h3>
                        </li>
                    </ul>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(NavBar);