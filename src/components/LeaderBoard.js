/** Importing Dependencies **/
import React, { Component } from 'react';
import axios from 'axios'; // HTTP Client

class LeaderBoard extends Component{


    constructor(){
        super();
        /** Initialising initial state of the component */
        this.state = {
            results: [], //Leaderboard results array
            sports: []  // Array for sport Autofill
        }
    }

    /** Life-cycle Method runs after the render method runs for the first time **/
    componentDidMount(){
        //Component has loaded -> Populate the sport array using HTTP Get Request, and store the result in sport state
        axios.get('/api/sports')
            .then(sports => this.setState({sports: sports.data}))
            .catch(err => console.error(err));
    }

    /** Handler to process Search Form */
    handleSubmit(e){
        //Retrieve the values from the form input boxes
       let sport = e.target.sport_select.value;
       let limit = e.target.limit.value;

       //Send HTTP GET request to server 
        axios.get(`api/LeaderBoard/${sport}/${limit}`)
            .then( res => this.setState({results : res.data})) // Store leaderboard result in result state array
            .catch( err => console.log(err));
        e.preventDefault(); //prevent form from redirecting the page on submit
    }
    
    /* Function to render the Leaderboard View */
    renderLeaderBoard(){
        //Extract result and sport arrays from state object
        const { results, sports } = this.state;
        if(results.length > 0){ //Only show this view if the array has been populated
            return(
                <div>
                    <div className='search-container' onSubmit={this.handleSubmit.bind(this)}>
                        <form className="Search">
                            <select id="limit"> 
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <label className="Search-label" htmlFor="Search-box"></label>
                            <input className="Search-box" id="sport_select" list="sports" placeholder="Search Sport" type="search" autoComplete="off" />
                            <datalist id="sports">
                                //Iterate through sport array and return option for the datalist to allow sport pre-fill in search box
                                { sports.map( sport => {
                                        const { discipline } = sport; 
                                            return  <option key={discipline} value={discipline}>{discipline}</option>
                                    })
                                }
                        </datalist>
                        </form>
                    </div>
                    <div className="leaderboard">
                        <div className="leaderboard--header">
                            <div className="leaderboard--item">
                                <div className="leaderboard--item--cell leaderboard--item--cell__user">
                                    <span>Name</span>
                                </div>
                                <div className="leaderboard--item--cell leaderboard--item--cell__thirty">
                                    <span>Medal Count</span>
                                </div>
                                <div className="leaderboard--item--cell leaderboard--item--cell__alltime">
                                    <span>Country</span>
                                </div>
                            </div>
                        </div>
                        {
                            //Itterate through the results array and return a custom table row 
                            results.map( result => {
                                //Extract variables from the result object;
                                let { count, country_name, discipline, iso_code, name } = result;
                                //If iso code exists, fetch a flag image from the API
                                let img = (iso_code == null) ? 'N/A' : <img src={`http://www.geonames.org/flags/x/${iso_code.toLowerCase()}.gif` } height="42" width="42" style={{margin: "20px"}}/>
                                return (
                                    <div key={Math.random()} className="leaderboard--list">
                                        <div className="leaderboard--item">
                                            <div className="leaderboard--item--cell leaderboard--item--cell__user">
                                                { name }
                                            </div>
                                            <div className="leaderboard--item--cell leaderboard--item--cell__thirty">
                                                { count }
                                            </div>
                                            <div className="leaderboard--item--cell leaderboard--item--cell__alltime">
                                                { img } { country_name }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }    
                    </div>
                </div>
            )
        }
    }

    /* Main render function for component */
    render(){
        // Extracting sport array from state object
        const { sports } = this.state;
        return(
             <div>
                <div className='search-container' onSubmit={this.handleSubmit.bind(this)}>
                    <form className="Search">
                        <select id="limit"> 
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label className="Search-label" htmlFor="Search-box"></label>
                        <input className="Search-box" id="sport_select" list="sports" placeholder="Search Sport" type="search" autoComplete="off" />
                        <datalist id="sports">
                            { sports.map( sport => {
                                    const { discipline } = sport; 
                                        return  <option key={discipline} value={discipline}>{discipline}</option>
                                })
                            }
                    </datalist>
                    </form>
                </div>
                <div className="leader-container">
                    { this.renderLeaderBoard() }
                </div>
            </div>
        )
    }
}

//Export component to allow import in other modules;
export default LeaderBoard;