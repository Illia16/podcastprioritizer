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
          <p>podcast length:{Math.round(length / 60)} minute </p>
        ) : (
          <p>podcast length:{Math.round(length / 60)} minutes</p>
        )}

        {length / 60 < transitTime.fastest ? (
          <p>Suggestion: You should drive!</p>
        ) : length / 60 < transitTime.bicycle ? (
          <p>Suggestion: You should bike!</p>
        ) : (
          <p>Suggestion: You should walk!</p>
        )}
      </div>
    );
  }
}
export default Suggestion;
