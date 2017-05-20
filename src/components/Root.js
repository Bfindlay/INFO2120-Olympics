import React, { Component } from 'react';
import { connect } from 'react-redux';


class Root extends  Component{
    constructor(){
        super();
    }

    componentWillMount(){

    }

    render(){
        return(
            { ...this.props.children }
        )
    }
}

const mapStateToProp = ({ DB }) => ({ DB });
export default connect(mapStateToProp, {})(Root);