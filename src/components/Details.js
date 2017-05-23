import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    constructor(){
        super();
    }

    render(){
        console.log('hi', this.props.state.DB);
        // const{ country_code, family_name, given_names, member_id, title } = this.props.DB.data;
        // console.log(ountry_code, family_name, given_names, member_id, title );
        return(
            <div>
                 <div className="details-container">
                    <h1> Details </h1>
                    <div className="details-module">
                        <h3>Member ID:</h3>
                        <h3>Name: </h3>
                        <h3>Type: </h3>
                        <h3>Accomodation: </h3>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({state});
export default connect(mapStateToProps, {})(Details);