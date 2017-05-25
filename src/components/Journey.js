
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchJourney } from '../actions';
import cookie from 'react-cookie';
class Journey extends Component {

    constructor(){
        super();
        this.state = {
            from: null,
            to: null,
            date: null
        }
    }

    render(){
        return(
            <div className='journeys'>
                <hr />
                <form>
                    <label> From: </label>
                    <input className="field" placeholder="Stadium" type="text" required="" onChange={({target}) => this.setState({from: target.value})}/>
                    <label> To: </label>
                    <input className="field" placeholder="Hotel" type="text" required=""onChange={({target}) => this.setState({to: target.value})}/>
                    <label> Date: </label>
                    <input className="field"  type="date" required=""onChange={({target}) => this.setState({date: target.value})}/>
                    <input className="submit" type='button' value="Search Journeys" onClick={ ()=> this.props.searchJourney(this.state)} />
                </form>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });

export default connect(mapStateToProps, {searchJourney})(Journey);