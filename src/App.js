import React, { Component } from 'react';
import LocationInput from './LocationsInput';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        
        <LocationInput />
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

