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
        const { transitTime, title, description, length, image, savePodcast, listenUrl, id } = this.props;
        return (
            <li>
                <button onClick={ this.showHideSuggestion }className="podcastButton">
                    <div className="thumbnailWrapper">
                        <img src={image} alt={title}></img>
                        <p>{title}</p>
                    </div>
                </button>

                <button onClick={(e) => { savePodcast(e, title, image, listenUrl, id) }}>Save podcast</button>

                <Suggestion showHideSuggestion={this.showHideSuggestion} stateSuggestion={this.state} propToprop={this.props}/>
            </li>
        )
    }
}

export default PodcastItem;

{/* <PodcastItem key={id} image={image} title={title_original} description={description_original} length={audio_length_sec} transitTime={this.state.transitTime} savePodcast={this.savePodcast} listenUrl={listennotes_url} id={id} /> */}