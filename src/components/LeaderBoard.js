import React, { Component } from 'react';
import axios from 'axios';

class LeaderBoard extends Component{

    constructor(){
        super();
        this.state = {
            results: [],
            sports: []
        }
    }

    componentWillMount(){
        axios.get('/api/sports')
            .then(sports => this.setState({sports: sports.data}))
            .catch(err => console.error(err));
    }

    handleSubmit(e){
       let sport = e.target.sport_select.value;
        axios.get(`api/LeaderBoard/${sport}`)
            .then( res => this.setState({results : res.data}))
            .catch( err => console.log(err));
        e.preventDefault();
    }

    renderLeaderBoard(){
        const { results } = this.state;
        console.log(results);
        if(results.length > 0){
            return(
                <div className="leaderboard">
                    <div className="leaderboard--header">
                        <div className="leaderboard--item">
                            <div className="leaderboard--item--cell leaderboard--item--cell__rank">
                                <span>Rank</span>
                            </div>
                            <div className="leaderboard--item--cell leaderboard--item--cell__user">
                                <span>Name</span>
                            </div>
                            <div className="leaderboard--item--cell leaderboard--item--cell__thirty">
                                <span>Medal</span>
                            </div>
                            <div className="leaderboard--item--cell leaderboard--item--cell__alltime">
                                <span>Country</span>
                            </div>
                        </div>
                    </div>
                    {
                        results.map( result => {
                            let { count, country_name, discipline, iso_code, name } = result;
                            let img = (iso_code == null) ? 'N/A' : <img src={`http://www.geonames.org/flags/x/${iso_code.toLowerCase()}.gif` } height="42" width="42"/>
                            console.log(iso_code);
                            return (
                                <div className="leaderboard--list">
                                    <div className="leaderboard--item">
                                        <div className="leaderboard--item--cell leaderboard--item--cell__rank">
                                            { count }
                                        </div>
                                        <div className="leaderboard--item--cell leaderboard--item--cell__user">
                                            { name }
                                        </div>
                                        <div className="leaderboard--item--cell leaderboard--item--cell__thirty">
                                            46
                                        </div>
                                        <div className="leaderboard--item--cell leaderboard--item--cell__alltime">
                                            { img }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }   
                </div>
            )
        }
    }

    render(){
        const { sports } = this.state;
        return(
             <div>
                <div className='search-container' onSubmit={this.handleSubmit.bind(this)}>
                    <form className="Search">
                        <input className="Search-box" id="sport_select" list="sports" placeholder="Search Sport" type="search" autoComplete="off" />
                        <label className="Search-label" htmlFor="Search-box"></label>
                        <datalist id="sports">
                            { sports.map( sport => {
                                    const { discipline } = sport; 
                                        return  <option key={discipline} value={discipline}>{discipline}</option>
                                })
                            }
                    </datalist>
                    </form>
                </div>
                { this.renderLeaderBoard() }
            </div>
        )
    }
}


export default LeaderBoard;