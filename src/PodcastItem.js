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
                    <img src={image} alt={title}></img>
                    <p>{title}</p>
              </div>
              <div className="podcastSave">
                    {loggedIn && <button onClick={(e) => { savePodcast(e, title, image, audio, id) }}>Save Podcast</button>}
              </div>
            </div>
        
            </li>
        )
    }
}

export default PodcastItem;