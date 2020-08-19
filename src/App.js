import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import PodcastInput from "./PodcastInput";
import PodcastItem from "./PodcastItem";
import PodcastSaved from "./PodcastSaved";
import firebase from "./database";
import Error from "./Error";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modes: ["bicycle", "pedestrian", "fastest"],
      genres: [],
      transitTime: {},
      podcasts: [],
      mapUrl: "",
      user: null,
      userId: "anonymous",
      podcastList: [],
      popUpError: false,
    };
    
    this.hideError = this.hideError.bind(this);
    this.showError = this.showError.bind(this);
  }

  hideError() {
    this.setState({
      popUpError: false
    });
  }

  showError() {
    this.setState({
      popUpError: true
    });
  }

  // Login method for Google Authentication
  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();

    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user,
        userId: user.uid,
      })
    })
  }

  // Logout method for Google Authentication
  logout = () => {
    const auth = firebase.auth();
    auth.signOut().then(() => {
      this.setState({
        user: null,
        userId: "",
        podcastList: []
      })
    })
  }

  // Save podcast to user list when button is clicked
  savePodcast = (e, title, image, listenUrl, id) => {
    const dbRef = firebase.database().ref();

    // Prevent default
    e.preventDefault();

    // Create a new object with required items
    const podcast = {
      title: title,
      image: image,
      listenUrl: listenUrl,
    }

    // Go to the user's ID and the podcast ID and set the above object
    dbRef.child(`${this.state.userId}/${id}`).set(podcast)
  }
  
  // Delete podcast item from the user's list
  deletePodcast = (e, key) => {

    // Prevent default
    e.preventDefault();

    // Go to the user's ID in the database
    const dbRef = firebase.database().ref(this.state.userId);

    // Remove the podcast based on its ID
    dbRef.child(key).remove();

  }

   // function to modify time from 00:00:00 format to minutes
  timeChange = (time) => {
    const arr = time.split(":");
    const add = parseInt(arr[0] * 60) + parseInt(arr[1]) + parseInt(arr[2] / 60);
    return add;
  };

  // making an API call for ROUTE
  handleSubmit = (e, from, to) => {
    // Prevent default
    e.preventDefault();

    // Axios call to mapquest API to get the map of the route  
      axios({
        url: `https://www.mapquestapi.com/staticmap/v5/map`,
        method: `GET`,
        responseType: `json`,
        params: {
          key: `x3MrPIPmomzlRE4OXlE1fjsepd4chw3q`,
          format: `png`,
          start: from,
          end: to,
          size: `200,200`,
          countryCode: `CA`,
          scalebar: true,
          margin: 40,
        },
      }).then((res) => {
        console.log(res);
        this.setState({ mapUrl: res.request.responseURL });
      });
    
    // For each mode of transportation, find the transit time, convert it to minutes and save it to state
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
          manMaps: true,
        },
      })
        .then((res) => {
          console.log("Distance in miles", res.data.route.distance);

          if (res.data.route.distance > 100) {
            this.setState({
              popUpError: true,
            })
          }

          const timeCopy = { ...this.state.transitTime }
          timeCopy[mode] = this.timeChange(res.data.route.formattedTime);
          this.setState({
            transitTime: timeCopy,
          });
        })
        .catch((er) => {
          console.log(er);
        });
    });
  };

  // making an API call for PODCAST
  podcastCall = (e, inputText, genreSel) => {
    // Prevent default
    e.preventDefault();

    // call the listennotes API and search for podcasts
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

  // Clear the list of podcast results from the page
  clearResults = () => {
    this.setState({
      mapUrl: "",
      transitTime: {},
      podcasts: [],
    });

    window.scrollTo(0, 0);
  };

  // componentDidMount method
  componentDidMount() {
    const auth = firebase.auth();

    // Check to see if the user was already logged in and set the state again
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        });
      }

      // Set the userId state again
      this.setState({
        userId: this.state.user.uid
      })

      // Reference the userId in the database
      const dbRef = firebase.database().ref(this.state.userId);

      // On load/change grab the user's saved list of podcasts and save to state
      dbRef.on('value', (response) => {

        console.log(dbRef);
        const podArray = [];
        const data = response.val()

        for (let key in data) {
          podArray.push({ key: key, podcasts: data[key] })
        }

        this.setState({
          podcastList: podArray
        })
      })
    })
  }

  // render method
  render() {
    return (
      <div className="App wrapper">

        {/* Header component */}
        <header>
          <h1>Podcast Prioritizer <i className="fas fa-headphones"></i></h1>
          <p>Can't decide which podcast to listen to on your next journey? Not sure whether you should walk, bike or drive? Use this web app by inputting your 'To', 'From', and a 'Podcast type' to determine which podcast you should listen to, and how you should get there.</p>
        </header>
      
        {/* SAVED PODCAST BY CERTAIN USER */}
        <ul>
        {
          this.state.podcastList.map((podcastItem) => {
            const {key, podcasts} = podcastItem
            return (
              <PodcastSaved key={key} title={podcasts.title} image={podcasts.image} listenURL={podcasts.listenURL} deletePodcast={this.deletePodcast} id={key} />
            )
          })
        }
        </ul>

        {/* Log In/ Log Out button */}
        {this.state.user ? <button onClick={this.logout}>Log out</button> : <button onClick={this.login}>Log In </button>}
        
        {/* FORM INPUT */}
        <PodcastInput inputText={this.podcastCall} handleSubmit={this.handleSubmit} error={this.state} hideErrorWindow={this.hideError} closeError={this.showError}/>
        
        {
          this.state.popUpError ? <Error hideErrorWindow={this.hideError} />  : null
        }
        
        {/* SHOW MAP AND TRANSIT TIMES FOR EACH MODE OF TRANSPORTATION */}
        <div className="transitMap">
          <div className="map">
            <img src={this.state.mapUrl}/>
          </div>

          <ul
            className="transit"
            style={{
              display: this.state.transitTime.bicycle && this.state.transitTime.fastest && this.state.transitTime.pedestrian ? "block" : "none",
            }}
          >
            
            {
              // walk time
              this.state.transitTime.pedestrian <= 1 ? (
                <li>walk time: {this.state.transitTime.pedestrian} minute</li>
              ) : (
                <li>walk time: {this.state.transitTime.pedestrian} minutes</li>
              )
              // bike time
            }

            {
              this.state.transitTime.bicycle <= 1 ? (
                <li>bike time: {this.state.transitTime.bicycle} minute</li>
              ) : (
                <li>bike time: {this.state.transitTime.bicycle} minutes</li>
              )
              // car time
            }

            {this.state.transitTime.fastest <= 1 ? (
              <li>car time: {this.state.transitTime.fastest} minute</li>
            ) : (
              <li>car time: {this.state.transitTime.fastest} minutes</li>
            )}
          </ul>
        </div>

        {/* LIST OF PODCASTS FROM THE SEARCH */}
        <ul>
          {
            this.state.podcasts.map((podcast) => {
              const { id, image, title_original, description_original, audio_length_sec, listennotes_url } = podcast
              return (
                <PodcastItem key={id} image={image} title={title_original} description={description_original} length={audio_length_sec} transitTime={this.state.transitTime} savePodcast={this.savePodcast} listenUrl={listennotes_url} id={id} />
              )
            })
          }
        </ul>

        {/* CLEAR THE LIST OF PODCAST RESULTS */}
        {
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
