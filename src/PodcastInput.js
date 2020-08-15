import React, { Component } from "react";
import LocationsInput from "./LocationsInput";

class PodcastInput extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
    };
  }

  

  render() {
    return (
      <form>
        <label htmlFor="podcastInput"></label>
        <input
          type="text"
          id="podcastInput"
          value={this.state.PodcastInput}
        ></input>
      </form>
    );
  }
}

export default PodcastInput;
