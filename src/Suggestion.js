import React, { Component } from "react";

class Suggestion extends Component {

 constructor(props){
  super(props)
  this.state={
   displaySuggestion:false
  }
 }


  render() {
    return (
      <div
        className="suggestion"
        

        style={{
          display: this.state.displaySuggestion ? "block" : "none",
        }}
      >
        {Math.round(podcast.audio_length_sec / 60) <= 1 ? (
          <p>
            podcast length:{Math.round(podcast.audio_length_sec / 60)} minute
          </p>
        ) : (
          <p>
            podcast length:{Math.round(podcast.audio_length_sec / 60)} minutes
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
    );
  }
}
export default Suggestion;
