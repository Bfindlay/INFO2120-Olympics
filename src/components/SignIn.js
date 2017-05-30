import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import jwt from 'jwt-decode';
import { logIn, error } from '../actions';
class SignIn extends Component {

    constructor(props) {
        super(props)
        //let signed = (cookie.load('token')) ? true :false;
        this.state = {
            password: '',
            id: ''
        }
    }
    
    componentWillUnmount(){
        //this.props.error(null);
    }

    render() {


        let { error } = this.props.DB;
        if (error !== null) {
            error = <p style={{ 'color': 'red', 'fontWeight': '600' }}> {error} </p>
        }

        return (
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                        <label> Member ID </label>
                        <input type="text" placeholder="A123456789" onChange={({ target }) => this.setState({ id: target.value })} />
                        <label> Password</label>
                        <input type="password" onChange={({ target }) => this.setState({ password: target.value })} />
                        <button onClick={() => this.props.logIn(this.state)}>login</button>
                        <p className="message">Not registered? <a href="#/register">Create an account</a></p>
                        { error }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ DB }) => ({DB});

export default connect(mapStateToProps, { logIn, error })(SignIn);

