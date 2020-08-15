import React, { Component } from "react";
import axios from "axios";
import LocationInput from "./LocationsInput";
import "./App.css";
import PodcastInput from "./PodcastInput";

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      modes:['bicycle','pedestrian'],
      genres: [],
      travellingTime: [],
    };
  }

  timeChange = (time) => {
    const arr = time.split(':');
    const add = parseInt(arr[0]*60) + parseInt(arr[1]) + parseInt(arr[2]/60);
    
    return add;
  }

locationData = (e, from, to) => {
  e.preventDefault();

  const timeInMins = [];
  const resultsArray = [];

  this.state.modes.forEach((mode) => {
    axios({
      url: `https://www.mapquestapi.com/directions/v2/route`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: `x3MrPIPmomzlRE4OXlE1fjsepd4chw3q`,
        from: from,
        to: to,
        routeType: mode,
      },
    }).then((res) => {
      console.log(res.data.route);
      resultsArray.push(res.data.route);

      const resInMins = this.timeChange(res.data.route.formattedTime);
      timeInMins.push(resInMins);
      console.log(timeInMins);
    });
  });

  // change to async LATER!!!!
  setTimeout(() => {
    this.setState({
      results: resultsArray,
      travellingTime: Math.max(...timeInMins),
    })
  }, 800);
  
};


  // componentDidMount() {
  //       axios({
  //       url: `https://listen-api.listennotes.com/api/v2/genres`,
  //       method: `GET`,
  //       responseType: `json`,
  //       headers: {
  //         'X-ListenAPI-Key': `d45d36385df142229be4941f98e07c20`,
  //       }
  //     }).then((res) => {
  //       console.log(res.data.genres);

  //       this.setState({
  //         genres: res.data.genres,
  //       });
  //     });
  // }

  render() {
    
    return (
      <div className="App">

        <LocationInput locationData={this.locationData}/>
        
        <PodcastInput />

        {/* <select type="whichCauldron" id="whichCauldron" name="userSelection">
          <option value="">Pick one please</option>
          {
          this.state.genres.map((oneGenre) => {
          return ( 
          <option value={oneGenre.id}>{oneGenre.name}</option>
            )
          })
          }
        </select> */}
        
        <button>Click me</button>
      </div>
    );
  }
}

export default App;

//Landing header with a Get Started button, or arrow, moves to user input

// User inputs for To and From

// Error handling for empty inputs, regex to prevent special characters from being typed, error when address can't be found

// Users submit map requests

// Get travel time and distance.  Convert time to minutes and store in state

// Genre dropdown or user search for podcast, user submits

// take genre/search value, add time state to API query, returns 10 results

// map results to page, clicking on a podcast will show whether they should walk or bike, under the grid of the results

/* Components:

App

Location Input: onChange: handleLocation

Podcast Input: onChange:handlepodcast

Podcast Grid

Travel Mode Result

Reset Button



*/
