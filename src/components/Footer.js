import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {

    constructor(){
        super();
    }
    
    render(){
            return(
                <div className='footer'>
                    <hr />
                </div>
            )
    }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(Footer);