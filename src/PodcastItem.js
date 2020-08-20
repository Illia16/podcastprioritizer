import React, { Component } from 'react';
import Suggestion from "./Suggestion";

class PodcastItem extends Component {
    constructor() {
        super();
        this.state = {
            displaySuggestion: false
        }
    }

    showHideSuggestion = () => {
        this.setState({
            displaySuggestion: !this.state.displaySuggestion,
        });
    };

    render() {

        const { title, image, savePodcast, audio, id, loggedIn, url,length,transitTime } = this.props;
        return (
          <li
            onMouseEnter={this.showHideSuggestion}
            onMouseLeave={this.showHideSuggestion}
            className="podcastContainer"
          >
            {/* <div className="podcastContainer"> */}
            <div className="podcastPiece">
              <img src={image} alt={title}></img>
            </div>
              <a href={url} target="_blank">listen here</a>

            <div>
              {this.state.displaySuggestion ? (
                <Suggestion length={length} transitTime={transitTime} />
              ) : (
                <p>{title}</p>
              )}
            </div>

            <div className="podcastSave">
              {loggedIn && (
                <button
                  onClick={(e) => {
                    savePodcast(e, title, image, audio, id);
                  }}
                >
                  Save Podcast
                </button>
              )}
            </div>
          </li>
        );
    }
}

export default PodcastItem;