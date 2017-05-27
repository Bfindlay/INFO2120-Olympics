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
                             <a onClick={ () => hashHistory.push('/Details')}><li>
                               <h3>Details</h3>
                            </li></a>
                            <a onClick={ () => hashHistory.push('/Events')}><li>
                                <h3>Events</h3>
                            </li></a>
                            <a onClick={ () => hashHistory.push('/Bookings')}><li>
                                <h3>Bookings</h3>
                            </li></a>
                            <a onClick={ () => hashHistory.push('/Journey')}><li>
                                <h3>Journeys</h3>
                            </li></a>
                           <a onClick= {() => this.props.logOut()}><li>
                                <h3 href="#contact">Log Out</h3>
                            </li></a>
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
                           <a onClick={()=> hashHistory.push('/Register')}><li>
                                <h3>Register</h3>
                            </li></a>
                            <a onClick={()=> hashHistory.push('/SignIn')}><li>
                                <h3>Login</h3>
                            </li></a>
                        </ul>
                        </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, { logOut })(NavBar);