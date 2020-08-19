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
        const { transitTime, title, description, length, image, savePodcast, audio, id } = this.props;
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

            <Suggestion
              showHideSuggestion={this.showHideSuggestion}
              stateSuggestion={this.state}
              propToprop={this.props}
            />
          </li>
        );
    }
}

export default PodcastItem;