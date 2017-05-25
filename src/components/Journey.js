
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
            places: []
        }
    }

    componentWillMount(){
        this.props.getPlaces();
    }
    render(){
        const { places } = this.props.DB;
        const { to, from, date } = this.state;
        return(
            <div className='journeys'>
                <hr />
                <form>
                    <label> From: </label>
                    <input className="field" placeholder="Stadium" type="text" required="" onChange={({target}) => this.setState({from: target.value})}/>
                    <select name="From">
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
                   </select>
                   <br/>
                    <label> To: </label>
                    <input className="field" placeholder="Hotel" type="text" required=""onChange={({target}) => this.setState({to: target.value})}/>
                    <select name="To">
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
                   </select>
                    <label> Date: </label>
                    <input className="field"  type="date" required=""onChange={({target}) => this.setState({date: target.value})}/>
                    <input className="submit" type='button' value="Search Journeys" onClick={ ()=> this.props.searchJourney(this.state)} />
                </form>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });

export default connect(mapStateToProps, {searchJourney, getPlaces})(Journey);