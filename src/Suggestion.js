import React, { Component } from "react";

class Suggestion extends Component {
  render() {
    const {
      length,
      transitTime,
    } = this.props;

    return (
      <div className="suggestion">
        {Math.round(length / 60) <= 1 ? (
          <p>Podcast length:{Math.round(length / 60)} minute </p>
        ) : (
            <p>Podcast length:{Math.round(length / 60)} minutes</p>
          )}

        {length / 60 < transitTime.fastest ? (
          <p>Suggestion: You should drive!</p>
        ) : length / 60 < transitTime.bicycle ? (
          <div>
            <p>Suggestion: You should bike!</p>
            <p>Disclaimer: Please do not bike with headphones.</p>
          </div>
        ) : (
              <p>Suggestion: You should walk!</p>
            )}
      </div>
    );
  }
}
export default Suggestion;
