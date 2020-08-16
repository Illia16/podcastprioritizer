import React, { Component } from "react";

class LocationInput extends Component {
  constructor() {
    super();
    this.state = {
      userInputFrom: "",
      userInputTo: "",
    
    };
  }

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

  render() {
    return (
      <div className="App">
        <form action="submit">
          <fieldset>
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

            {/* <button onClick={(e) => this.props.locationData(e, this.state.userInputFrom, this.state.userInputTo)}>Submit</button> */}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default LocationInput;
