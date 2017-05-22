import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import jwt from 'jwt-decode';
import { logIn } from '../actions';
class SignIn extends Component{

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

        return(
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                    <label> Member ID </label>
                    <input type="text" placeholder="1244223" onChange={({ target }) => this.setState({id: target.value}) }/>
                    <label> Password</label>
                    <input type="password" placeholder="*********" onChange={({ target }) => this.setState({password: target.value}) }/>
                        <button onClick={() => this.props.logIn(this.state) }>login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { state }
}

export default connect(mapStateToProps, { logIn } )(SignIn);

