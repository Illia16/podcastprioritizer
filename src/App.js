import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import MapMode from './MapMode'
import PodcastInput from "./PodcastInput";
import PodcastItem from "./PodcastItem";
import PodcastMenu from './PodcastMenu';
import firebase from "./database";
import HeaderSection from "./headerSection";

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
      menuOpen: false
    };
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
  savePodcast = (e, title, image, audio, id) => {
    const dbRef = firebase.database().ref();

    // Prevent default
    e.preventDefault();

    // Create a new object with required items
    const podcast = {
      title: title,
      image: image,
      audio: audio,
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

  podcastMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
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
         
        },
      })
        .then((res) => {
          console.log(res);
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
      this.setState({
        podcasts: res.data.results,
      });
    });
  };

  // CLear the list of podcast results from the page
  clearResults = () => {
    this.setState({
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

      <div className="App">
        <div className="wrapper">
          <HeaderSection />

        {/* MENU TO OPEN/CLOSE PODCAST LIST AND LOGIN BUTTON */}
        <button className="menuButton" onClick={this.podcastMenu}><i className="fas fa-bars"></i></button>

        {/* LOGIN AND PODCAST LIST MENU */}
        {this.state.menuOpen ? <PodcastMenu key="podcastMenu" user={this.state.user} podcastList={this.state.podcastList} logout={this.logout} login={this.login} deletePodcast={this.deletePodcast} /> : null}

        {/* FORM INPUT */}
        <PodcastInput inputText={this.podcastCall} handleSubmit={this.handleSubmit} />
        
        {/* SHOW MAP AND TRANSIT TIMES FOR EACH MODE OF TRANSPORTATION */}
        <MapMode map={this.state.mapUrl} transitTime={this.state.transitTime}/>

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
        <footer>Copyright &copy; Podcast Prioritizer | Made at Juno College</footer>
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
