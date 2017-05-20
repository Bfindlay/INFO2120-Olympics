import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {

    constructor(){
        super();
    }
    
    render(){
        return(
            <div className='navbar'>
                <div className='title'>
                    <h1> Olympics App </h1>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#home">Home</a>
                        </li>
                        <li><a href="#about">About</a>
                        </li>
                        <li><a href="#contact">Contact</a>
                        </li>
                    </ul>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(NavBar);