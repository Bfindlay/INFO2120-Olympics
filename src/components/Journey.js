
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchJourney, getPlaces } from '../actions';
import cookie from 'react-cookie';
class Journey extends Component {

    constructor(){
        super();
        this.state = {
            from: '',
            to: '',
            date: null,
            fromSelected: '',
            toSelected: '',
            places: []
        }
    }

    componentWillMount(){
        this.props.getPlaces();
    }

    validate(callback){
        console.log('validate');
        console.log(this.target);
    }
    error(){
        //cant travel from the same place to the same place
    }
    render(){
        const { places } = this.props.DB;
        const { to, from, date, fromSelected, toSelected } = this.state;
        return(
            <div className='journeys'>
                <hr />
                <form>
                    <label> From: </label>
                    <input className="field" list="from" placeholder="Stadium" type="text" required="" />
                    <datalist id="from">
                        {
                            places.map( place => {
                                const {place_id, place_name } = place;
                                return  <option key={place_id} value={place_id}>{place_name}</option>
                            })
                        }
                   </datalist>
                   <br/>
                    <label> To: </label>
                    <input className="field" list="To" placeholder="Hotel" type="text" required=""/>
                    <datalist id="To">
                        {
                            places.map( place => {
                                const {place_id, place_name } = place; 
                                    return  <option key={place_id} value={place_id}>{place_name}</option>
                            })
                        }
                   </datalist>
                   <br />
                    <label> Date: </label>
                    <input className="field"  type="date" required=""onChange={({target}) => this.setState({date: target.value})}/>
                    <input className="submit" type='button' value="Search Journeys" onSubmit={ ()=> this.validate(this.props.searchJourney).bind(this)} />
                </form>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });

export default connect(mapStateToProps, {searchJourney, getPlaces})(Journey);