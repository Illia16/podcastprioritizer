import React, { Component } from "react";
import axios from "axios";

class PodcastInput extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
      userInputFrom: "",
      userInputTo: "",
      genres: [],
      genreSelected: ""
    };
  }

  handleChangeText = (e) => {
    e.preventDefault();
    this.setState({
      podcastInput: e.target.value,
    });
  };

  handleFromOnChange = (e) => {
    e.preventDefault();

    this.setState({
      userInputFrom: e.target.value,
    });
  };

  handleToOnChange = (e) => {
    e.preventDefault();

    this.setState({
      userInputTo: e.target.value,
    });
  };

  componentDidMount() {
    axios({
      url: `https://listen-api.listennotes.com/api/v2/genres`,
      method: `GET`,
      responseType: `json`,
      headers: {
        "X-ListenAPI-Key": `d45d36385df142229be4941f98e07c20`,
      }
    }).then((res)=>{
      this.setState({
        genres: res.data.genres
      })
    })
  }

  selectChange = (e) => {
    // getting the name of the selected option
    console.log(e.target.options[e.target.selectedIndex].text);

    // this.setState({
    //   podcastInput: "",
    //   genreSelected: "",
    // })

    // if (this.state.podcastInput === "") {
      this.setState({
        podcastInput: e.target.options[e.target.selectedIndex].text,
        genreSelected: e.target.value,
      })
    // } else {
    //     this.setState({
    //       genreSelected: e.target.value,
    //     })
    // }
  }


  render() {
    return (
      <div>
        <form>
          <label htmlFor="userInputFrom">From</label>
          <input
            type="text"
            name="userInputFrom"
            id="userInputFrom"
            value={this.state.userInputFrom}
            onChange={this.handleFromOnChange}
          />

          <label htmlFor="userInputTo">To</label>
          <input
            type="text"
            name="userInputTo"
            id="userInputTo"
            value={this.state.userInputTo}
            onChange={this.handleToOnChange}
          />
          
          <label htmlFor="podcastInput"></label>
          <input
            onChange={this.handleChangeText}
            type="text"
            name="podcastInput"
            id="podcastInput"
            value={this.state.podcastInput}
          ></input>

          <select type="genresSelect" id="genreSelect" name="genreSelect" onChange={this.selectChange}>
            <option value="">Please select an genre</option>
            {
              this.state.genres.map((genre)=>{
                return(
                  <option value={genre.id} key={genre.id}>{genre.name}</option>
                )
              })
            }
          </select>

          <button
            onClick={(event) => {
              // this.props.locationData(event, this.state.userInputFrom, this.state.userInputTo)
              this.props.inputText(event, this.state.podcastInput, this.state.genreSelected);
              this.props.locationData(event, this.state.userInputFrom, this.state.userInputTo)
              this.setState({
                podcastInput: "",
                userInputFrom: "",
                userInputTo: "",
                genreSelected: ""
              });
            }}
          >
            Click me
          </button>
        </form>  
      </div>
    );
  }
}

export default PodcastInput;
