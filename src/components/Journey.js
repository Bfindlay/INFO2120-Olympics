
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
        const { toSelected, fromSelected } = this.state;
        return (toSelected === fromSelected) ? error() : callback(this.state);
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
                    <input className="field" list="from" placeholder="Stadium" type="text" required="" onChange={({target}) => this.setState({from: target.value})}/>
                    <datalist id="from">
                        {
                            places.map( place => {
                                const {place_id, place_name } = place;
                                let matcher = new RegExp(".+" + from + ".+$", "g");
                                let matches = matcher.test(place_name);
                                if (matches) {
                                    return  <option key={place_id} value={place_id}>{place_name}</option>
                                }
                            })
                        }
                   </datalist>
                   <br/>
                    <label> To: </label>
                    <input className="field" list="to" placeholder="Hotel" type="text" required=""onChange={({target}) => this.setState({to: target.value})}/>
                    <datalist id="To">
                        {
                            places.map( place => {
                                const {place_id, place_name } = place;
                                var matcher = new RegExp(".*" + from + ".*", "g");
                                let matches = matcher.test(place_name);
                                if (matches) {
                                    return  <option key={place_id} value={place_id}>{place_name}</option>
                                }
                            })
                        }
                   </datalist>
                   <br />
                    <label> Date: </label>
                    <input className="field"  type="date" required=""onChange={({target}) => this.setState({date: target.value})}/>
                    <input className="submit" type='button' value="Search Journeys" onClick={ ()=> this.validate(this.props.searchJourney)} />
                </form>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });

export default connect(mapStateToProps, {searchJourney, getPlaces})(Journey);