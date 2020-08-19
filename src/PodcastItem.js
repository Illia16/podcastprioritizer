import React, { Component } from 'react';
import Suggestion from "./Suggestion";

class PodcastItem extends Component {
    constructor() {
        super();
        this.state = {
            displaySuggestion: false
        }
    }

    showHideSuggestion = (e) => {
        e.preventDefault();
        this.setState({
            displaySuggestion: !this.state.displaySuggestion,
        });
    };

    render() {
        const { title, description, image, savePodcast, audio, id, loggedIn } = this.props;
        return (
          <li>
            <div className="podcastContainer">
              <div className="podcastPiece">
                <button
                  onClick={this.showHideSuggestion}
                  className="podcastButton"
                >
                  <div className="thumbnailWrapper">
                    <img src={image} alt={title}></img>
                    <p>{title}</p>
                  </div>
                </button>
              </div>
              <div className="podcastSave">
                <button
                  onClick={(e) => {
                    savePodcast(e, title, image, audio, id);
                  }}
                >
                  Save podcast
                </button>
              </div>
            </div>
            {loggedIn && <button onClick={(e) => { savePodcast(e, title, image, audio, id) }}>Save podcast</button>}

            <Suggestion showHideSuggestion={this.showHideSuggestion} stateSuggestion={this.state} propToprop={this.props} description={description} />
            </li>
        )
    }
}

export default PodcastItem;