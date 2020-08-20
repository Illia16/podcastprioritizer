import React, { Component } from 'react';
import Suggestion from "./Suggestion";

class PodcastItem extends Component {
  constructor() {
    super();
    this.state = {
      displaySuggestion: false
    }
  }

  // Show/hide the Suggestion when the button is clicked
  showHideSuggestion = () => {
    this.setState({
      displaySuggestion: !this.state.displaySuggestion,
    });
  };

  render() {

    const { title, image, savePodcast, audio, id, loggedIn, url, length, transitTime } = this.props;
    return (
      <li className="podcastContainer">
        <button onClick={this.showHideSuggestion} className="podcastButton">

          <div className="podcastPiece">
            <img src={image} alt={title}></img>
          </div>

          <a href={url}>Listen Here</a>

          {this.state.displaySuggestion ? <Suggestion length={length} transitTime={transitTime} /> : <p>{title}</p>}
        </button>

        <div className="podcastSave">
          {loggedIn && <button onClick={(e) => {savePodcast(e, title, image, audio, id);}}>Save Podcast</button>}
        </div>
      </li>
    );
  }
}

export default PodcastItem;