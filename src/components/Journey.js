
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

    handleSubmit(e){
        let from = e.target.fromSelected.value;
        let to = e.target.toSelected.value;
        let date = e.target.date.value;
        //Throw error
        if(to === from){
            return console.log("Cant take journey from the same place");
        }
        this.props.searchJourney({ to: to, from: from, date: date });
        e.preventDefault();
    }
    error(){
        //cant travel from the same place to the same place
    }
    render(){
        const { places } = this.props.DB;
        const { to, from, date, fromSelected, toSelected } = this.state;
        return(
            <div className='journeys'>
                <div className='form-container'>
                        <hr />
                        <form onSubmit={ this.handleSubmit }>
                            <label> From: </label>
                            <input id="fromSelected" className="field" list="from" placeholder="Stadium" type="text" required="" />
                            <datalist id="from">
                                {
                                    places.map( place => {
                                        const {place_id, place_name } = place;
                                        return  <option key={place_id} value={place_name}>{place_name}</option>
                                    })
                                }
                        </datalist>
                        <br/>
                            <label> To: </label>
                            <input id="toSelected" className="field" list="To" placeholder="Hotel" type="text" required=""/>
                            <datalist id="To">
                                {
                                    places.map( place => {
                                        const {place_id, place_name } = place; 
                                            return  <option key={place_id} value={place_name}>{place_name}</option>
                                    })
                                }
                        </datalist>
                        <br />
                            <label> Date: </label>
                            <input id='date' className="field"  type="date" required=""onChange={({target}) => this.setState({date: target.value})}/>
                            <button className="submit"> Search Journey </button>
                        </form>
                    </div>
            </div>
        )
    }
}

const mapStateToProps =  ({ DB }) => ({ DB });

export default connect(mapStateToProps, {searchJourney, getPlaces})(Journey);