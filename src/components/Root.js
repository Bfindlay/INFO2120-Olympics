import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import NavBar from './NavBar';
import { reloadUser } from '../actions';

class Root extends  Component{
    constructor(){
        super();
    }

    componentWillMount(){
        const user = cookie.load('member');
        if(user){
            this.props.reloadUser(user);
        }
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
export default connect(mapStateToProp, {reloadUser})(Root);