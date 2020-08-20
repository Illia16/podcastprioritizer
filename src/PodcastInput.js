import React, { Component } from "react";
import axios from "axios";
import Error from "./Error";

class PodcastInput extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
      userInputFrom: "",
      userInputTo: "",
      genres: [],
      genreSelected: "",
    };
  }

  // Function that listens to OUR TEXT INPUTS AND SETS a value to the appropriate input
  handleChangeText = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Filling drop-down selection with podcast genres
  componentDidMount() {
    axios({
      url: `https://listen-api.listennotes.com/api/v2/genres`,
      method: `GET`,
      responseType: `json`,
      headers: {
        "X-ListenAPI-Key": `d45d36385df142229be4941f98e07c20`,
      },
    }).then((res) => {
      this.setState({
        genres: res.data.genres,
      });
    });
  }

  // Getting the name of the Select Option
  selectChange = (e) => {
    this.setState({
      podcastInput: e.target.options[e.target.selectedIndex].text,
      genreSelected: e.target.value,
    });
  };

  // Check for special characters in inputs
  checkForChar = () => {
    const regex = /^[A-Za-z0-9 ]+$/;
    const isNotValid = regex.test(this.state.userInputFrom);
    return isNotValid;
  };

  // Render method
  render() {
    const {hideErrorWindow, showErrorWindow, error:{ popUpError } } = this.props;

    return (
      <div>
        <form>

          {/* To/from destination inputs */}
          <section className="travelDetails">
            <h2><i className="fas fa-map-marker-alt" aria-label="Icon of a location pin"></i> Type in your travel details</h2>

            <div className="startingPoint">
              <label htmlFor="userInputFrom">Starting Point:</label>
              <input
                type="text"
                name="userInputFrom"
                id="userInputFrom"
                value={this.state.userInputFrom}
                onChange={this.handleChangeText}
                placeholder="12 Bloor Street Toronto"
              />
            </div>

            <div className="destination">
              <label htmlFor="userInputTo">Destination:</label>
              <input
                type="text"
                name="userInputTo"
                id="userInputTo"
                value={this.state.userInputTo}
                onChange={this.handleChangeText}
                placeholder="11 Yonge Street Toronto"
              />
            </div>
          </section>

          {/* Podcast search */}
          <section className="podcastDetails">
            <div className="podcastSearch">
              <h2><i className="fas fa-podcast" aria-label="Icon of a microphone"></i> Type in your podcast details</h2>

              {/* Podcast text search */}
              <label htmlFor="podcastInput">Podcast Search:</label>
              <input
                onChange={this.handleChangeText}
                type="text"
                name="podcastInput"
                id="podcastInput"
                value={this.state.podcastInput}
                placeholder="ex: genre, title, creator"
                aria-label="example: genre, title, creator"
              ></input>
            </div>

            {/* Podcast genre selection */}
            <div className="podcastDropDown">
              <p>Or pick a genre:</p>
              <select
                type="genresSelect"
                id="genreSelect"
                name="genreSelect"
                onChange={this.selectChange}
              >
                <option value="">Please select a genre</option>
                {this.state.genres.map((genre) => {
                  return (
                    <option value={genre.id} key={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          
          {/* Popup error window */}
          {popUpError && <Error hideErrorWindow={hideErrorWindow}/>}
          
          {/* Submit button for searching */}
          <button
            className="formButton"
            onClick={(event) => {
              event.preventDefault();
        
              if (!this.state.podcastInput || !this.state.userInputFrom || !this.state.userInputTo || this.checkForChar() === false) {
                showErrorWindow()
              } else {
                this.props.inputText(event, this.state.podcastInput, this.state.genreSelected);
                this.props.handleSubmit(event, this.state.userInputFrom, this.state.userInputTo);
                this.setState({
                  podcastInput: "",
                  userInputFrom: "",
                  userInputTo: "",
                  genreSelected: "",
                })
              }
            }
          }
          >
            FIND SUGGESTIONS
          </button>
        </form>
      </div>
    );
  }
}

export default PodcastInput;
