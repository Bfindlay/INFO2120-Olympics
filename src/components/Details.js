import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Details extends Component {

    constructor(){
        super();
    }

    componentWillMount(){
        const { signed } = this.props.DB;
        if(!signed){
            hashHistory.push('/');
        }
    }

    render(){
        const{ country_code, family_name, given_names, member_id, title, accommodation } = this.props.DB;
      
        return(
            <div>
                 <div className="details-container">
                    <h1> Details </h1>
                    <div className="details-module">
                        <h3>Member ID: {member_id}</h3>
                        <h3>Name: {family_name}</h3>
                        <h3>Type: {member_id}</h3>
                        <h3>Accomodation: {accommodation}</h3>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {})(Details);