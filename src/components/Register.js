import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import jwt from 'jwt-decode';
import { logIn } from '../actions';

class Register extends Component{

     constructor(props) {
        super(props)
        //let signed = (cookie.load('token')) ? true :false;
        this.state = {
            password: '',
            id: ''
        }
     }
    
    render(){

        let error;
        if(this.state.error !== null){
            error =  <p style={{'color': 'red', 'fontWeight': '600'}}> {this.state.error} </p>     
        }
        // member id, title, first name, last name, country code, accomdation, password
        return(
            <div className="login-page2">
                <div className="form">
                    <div className="login-form">
                    <label> Member ID </label>
                    <input type="text" placeholder="A123456789" onChange={({ target }) => this.setState({id: target.value}) }/>
                    <label> Password </label>
                    <input type="password" onChange={({ target }) => this.setState({id: target.value}) }/>
                    <label> Re-Enter Password </label>
                    <input type="password" onChange={({ target }) => this.setState({id: target.value}) }/>
                    <label> Title </label>
                    <select>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                    </select>

                    <br/>
                    <br/>
                    <label>First Name</label>
                    <input type="text" placeholder="John" onChange={({ target }) => this.setState({password: target.value}) }/>
                    <label>Last Name</label>
                    <input type="text" placeholder="Smith" onChange={({ target }) => this.setState({password: target.value}) }/>
                    
                    <label> Accomodation</label>
                    <input type="text" onChange={({ target }) => this.setState({password: target.value}) }/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { state }
}

export default connect(mapStateToProps, { logIn } )(Register);

