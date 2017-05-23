import React, { Component } from 'react';
import axios from 'axios';

class Query extends Component{

    constructor(){
        super();
        this.state ={
            query: ''
        }
    }

    submitQuery() {
        axios.post('/api/Test', this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err));

    }
    render(){
        return(
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                    <label> Query </label>
                    <input type="text" placeholder="SELECT * FROM" onChange={({ target }) => this.setState({query: target.value}) }/>
                        <button onClick={() => this.submitQuery() }>Submit Query</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Query;