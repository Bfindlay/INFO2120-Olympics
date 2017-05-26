import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import jwt from 'jwt-decode';
import { logIn } from '../actions';
class SignIn extends Component {

    constructor(props) {
        super(props)
        //let signed = (cookie.load('token')) ? true :false;
        this.state = {
            password: '',
            id: ''
        }
    }
    
    hello(e) {
        if(key.keyCode == 13) {
            console.log("Enter key");
        }
    }

    render() {


        let error;
        if (this.state.error !== null) {
            error = <p style={{ 'color': 'red', 'fontWeight': '600' }}> {this.state.error} </p>
        }

        return (
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                        <label> Member ID </label>
                        <input type="text" placeholder="A123456789" onChange={({ target }) => this.setState({ id: target.value })} />
                        <label> Password</label>
                        <input type="password" onChange={({ target }) => this.setState({ password: target.value })} onChange={ () => { this.hello(e)}} />
                        <button onClick={() => this.props.logIn(this.state)}>login</button>
                        <p className="message">Not registered? <a href="#/register">Create an account</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { state }
}

export default connect(mapStateToProps, { logIn })(SignIn);

