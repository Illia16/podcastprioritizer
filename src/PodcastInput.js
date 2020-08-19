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

  // function that listens to OUR TEXT INPUTS AND SETS a value to the appropriate input
  handleChangeText = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // filling drop-down selection with podcast genres
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

  selectChange = (e) => {
    // getting the name of the selected option
    console.log(e.target.options[e.target.selectedIndex].text);

    this.setState({
      podcastInput: e.target.options[e.target.selectedIndex].text,
      genreSelected: e.target.value,
    });
  };


  render() {
    const {hideErrorWindow, closeError, error:{ popUpError } } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="userInputFrom">From</label>
          <input
            type="text"
            name="userInputFrom"
            id="userInputFrom"
            value={this.state.userInputFrom}
            onChange={this.handleChangeText}
          />

          <label htmlFor="userInputTo">To</label>
          <input
            type="text"
            name="userInputTo"
            id="userInputTo"
            value={this.state.userInputTo}
            onChange={this.handleChangeText}
          />
          

          <label htmlFor="podcastInput"></label>
          <input
            onChange={this.handleChangeText}
            type="text"
            name="podcastInput"
            id="podcastInput"
            value={this.state.podcastInput}
          ></input>

          <select
            type="genresSelect"
            id="genreSelect"
            name="genreSelect"
            onChange={this.selectChange}
          >
            <option value="">Please select an genre</option>
            {this.state.genres.map((genre) => {
              return (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>

          {
            popUpError ? <Error hideErrorWindow={hideErrorWindow}/> : null
          }
          
          <button
            onClick={ (event) => {
              event.preventDefault();

              if (!this.state.podcastInput || !this.state.userInputFrom || !this.state.userInputTo) {
                closeError()
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
            Click me
          </button>
        </form>
      </div>
    );
  }
}

export default PodcastInput;
