import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { logOut } from '../actions';
class NavBar extends Component {

    constructor(){
        super();
    }
    
    render(){
        const{ signed } = this.props.DB;
        if(signed){
            return(
                <div className='navbar'>
                    <div className='title' onClick={() => hashHistory.push('/')}>
                        <h1> Olympics DB </h1>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>
                                <h3 href="#home">My Detail</h3>
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
                                <a onClick= {() => this.props.logOut()}><h3 href="#contact">Log Out</h3></a>
                            </li>
                        </ul>
                        </div>
                </div>
            )
        }else{
            return(
                <div className='navbar'>
                    <div className='title' onClick={() => hashHistory.push('/')}>
                        <h1> Olympics DB </h1>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>
                                <a onClick={()=> hashHistory.push('/Register')}><h3>Register</h3></a>
                            </li>
                            <li>
                                <a onClick={()=> hashHistory.push('/SignIn')}><h3>Log In</h3></a>
                            </li>
                        </ul>
                        </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, { logOut })(NavBar);