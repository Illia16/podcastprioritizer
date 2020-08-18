import React, { Component } from "react";

class Suggestion extends Component {
  render() {
    const { showHideSuggestion, stateSuggestion, propToprop:{length, transitTime} } = this.props;

    return (
      <div
      onClick={ showHideSuggestion }
      className="suggestion"
      style={{ display: stateSuggestion.displaySuggestion ? "block" : "none", }} >
        {
            Math.round(length / 60) <= 1 ?
                <p>podcast length:{Math.round(length / 60)} minute </p> :
                <p>podcast length:{Math.round(length / 60)} minutes</p>
        }

        <p> walk:{transitTime.pedestrian} minutes</p>
        <p>bike:{transitTime.bicycle} minutes</p>
        <p>drive:{transitTime.fastest} minutes</p>

        {
            length / 60 < transitTime.fastest ?
                <p>suggestion: you should drive</p> :
                length / 60 < transitTime.bicycle ?
                    <p>suggestion: you should bike</p> :
                    <p>suggestion: you should walk</p>
        }
      </div>
    );
  }
}
export default Suggestion;
