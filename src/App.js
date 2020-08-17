import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import PodcastInput from "./PodcastInput";
import PodcastItem from "./PodcastItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      modes: ["bicycle", "pedestrian", "fastest"],
      genres: [],
      transitTime: {},
      podcasts: [],
    };
  }

  timeChange = (time) => {
    const arr = time.split(":");
    const add =
      parseInt(arr[0] * 60) + parseInt(arr[1]) + parseInt(arr[2] / 60);

    return add;
  };

  locationData = (e, from, to) => {
    e.preventDefault();

    const resultsArray = [];
    const timeInMins = {};
    // const promiseArr = [];

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
      })
        .then((res) => {
          console.log(res.data.route);
          resultsArray.push(res.data.route);

          timeInMins[mode]= this.timeChange(res.data.route.formattedTime);
          console.log(timeInMins);
        })
        .catch((er) => {
          console.log(er);
        });
    });

    // Promise.all(promiseArr).then((res) => {
    //   console.log(res, 'result');
    // })

    console.log(resultsArray, timeInMins);

    // change to async LATER!!!!
    setTimeout(() => {
      this.setState({
        results: resultsArray,
        transitTime: timeInMins,
      });
    }, 800);
  };

  podcastCall = (e, inputText, genreSel) => {
    e.preventDefault();

    axios({
      url: `https://listen-api.listennotes.com/api/v2/search`,
      method: `GET`,
      responseType: `json`,
      headers: {
        "X-ListenAPI-Key": `d45d36385df142229be4941f98e07c20`,
      },
      params: {
        q: inputText,
        len_max: this.state.transitTime.pedestrian,
        genre_ids: genreSel,
      },
    }).then((res) => {
      console.log(res.data.results);
      this.setState({
        podcasts: res.data.results,
      });
    });
  };

  clearResults = () => {
    this.setState({
      podcasts: [],
    });

    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="App wrapper">

        <PodcastInput inputText={this.podcastCall} locationData={this.locationData}/>

        <ul>
          {
            this.state.podcasts.map((podcast)=> {
              const {id, image, title_original, description_original, audio_length_sec} = podcast
              return(
                <PodcastItem key={id} image={image} title={title_original} description={description_original} length={audio_length_sec} transitTime={this.state.transitTime} />
              )
            })
          }
        </ul>

        {
          // Start over the search BUTTON. Only gets visible when there's a list of podcasts on the page.
          this.state.podcasts.length !== 0 ? (
            <button onClick={this.clearResults}>Start over</button>
          ) : null
        }
      
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
