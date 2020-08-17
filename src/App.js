import React, { Component }from "react";
import axios from "axios";
import LocationInput from "./LocationsInput";
import "./App.scss";
import PodcastInput from "./PodcastInput";

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      modes: ["bicycle", "pedestrian"],
      genres: [],
      transitTime: [],
      travellingTime: [],
      podcasts: [],
      displaySuggestion: false,
    };
    this.inputRef = React.createRef();
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
    const timeInMins = [];
    // const promiseArr = [];

    this.state.modes.forEach( (mode) => {
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

          const resInMins = this.timeChange(res.data.route.formattedTime);
          timeInMins.push(resInMins);
          console.log(timeInMins);
        })
        .catch((er) => {
          console.log(er);
        })
    });

    // Promise.all(promiseArr).then((res) => {
    //   console.log(res, 'result');
    // })

    

    

    // change to async LATER!!!!
    setTimeout(() => {
      this.setState({
        results: resultsArray,
        transitTime: timeInMins,
        travellingTime: Math.max(...timeInMins),
      });
    }, 800);
  };

  podcastCall = (e, inputText) => {
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
        len_max: this.state.travellingTime,
      },
    }).then((res) => {
      console.log(res.data.results);
      this.setState({
        podcasts: res.data.results,
      });
    });
  };
  

  displaySuggestion = (e,i) => {
    e.preventDefault()   
     
  
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
        <LocationInput locationData={this.locationData} />

        <PodcastInput inputText={this.podcastCall} />

        <ul>
          {
          this.state.podcasts.map((podcast) => {
            return (
              <li key={podcast.id}>
                <button onClick={()=>this.displaySuggestion(podcast.id)}>
                  <div className="thumbnailWrapper">
                    <img
                      src={podcast.thumbnail}
                      alt={podcast.title_original}
                    ></img>
                    <p>{podcast.title_original}</p>
                  </div>
                </button>

                <div
                  className="suggestion"
                  style={{
                    display: this.state.displaySuggestion ? "block" : "none",
                  }}
                >
                  {Math.round(podcast.audio_length_sec / 60) <= 1 ? (
                    <p>
                      podcast length:{Math.round(podcast.audio_length_sec / 60)}{" "}
                      minute
                    </p>
                  ) : (
                    <p>
                      podcast length:{Math.round(podcast.audio_length_sec / 60)}{" "}
                      minutes
                    </p>
                  )}
                  
                   
                  

                  <p> walk:{Math.max(...this.state.transitTime)} minutes</p>
                  <p>bike:{Math.min(...this.state.transitTime)} minutes</p>
                  {podcast.audio_length_sec / 60 > this.state.travellingTime ? (
                    <p>suggestion: you should walk</p>
                  ) : (
                    <p>suggestion: you should bike</p>
                  )}
                </div>
              </li>
            );
          })
          }
        </ul>
        
        {
        // Start over the search BUTTON. Only gets visible when there's a list of podcasts on the page.
          this.state.podcasts.length !== 0 ? <button onClick={this.clearResults}>Start over</button>
          : null
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
