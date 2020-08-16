import React, { Component } from "react";

class PodcastInput extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
    };
  }

  handleChangeText = (e) => {
    e.preventDefault();
    this.setState({
      podcastInput: e.target.value,
    });
  };

  render() {
    return (
      <form>
        <label htmlFor="podcastInput"></label>
        <input
          onChange={this.handleChangeText}
          type="text"
          name="podcastInput"
          id="podcastInput"
          value={this.state.podcastInput}
        ></input>

        <button
          onClick={(event) => {
            this.props.locationData(event, this.state.userInputFrom, this.state.userInputTo)
            this.props.inputText(event, this.state.podcastInput);
            this.setState({ 
              podcastInput: "",
            });
          }}
        >
          Click me
        </button>
      </form>
    );
  }
}

export default PodcastInput;
