import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';

class Root extends  Component{
    constructor(){
        super();
    }

    componentWillMount(){

    }

    render(){
        return(
            <div className='app-container'>
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProp = ({ DB }) => ({ DB });
export default connect(mapStateToProp, {})(Root);