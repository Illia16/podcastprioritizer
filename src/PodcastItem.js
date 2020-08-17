import React, { Component } from 'react';

class PodcastItem extends Component {
    constructor() {
        super();
        this.state= {
            displaySuggestion: false
        }
    }

    displaySuggestion = (e) => {
        e.preventDefault();
        this.setState({
            displaySuggestion: !this.state.displaySuggestion,
        });
    };

    render(){
        const {transitTime, title, description, length, image} = this.props;
        return(   
                <li>
                    <button onClick={this.displaySuggestion} className="podcastButton">
                        <div className="thumbnailWrapper">
                            <img
                                src={image}
                                alt={title}
                            ></img>
                            <p>{title}</p>
                        </div>
                    </button>

                    <div 
                        onClick={this.displaySuggestion}
                        className="suggestion"
                        style={{
                            display: this.state.displaySuggestion ? "block" : "none",
                        }}
                    >
                        {
                            Math.round(length / 60) <= 1 ? (
                                <p>
                                    podcast length:{Math.round(length / 60)}{" "}
                        minute
                                </p>
                            ) : (
                                    <p>
                                        podcast length:{Math.round(length / 60)}{" "}
                        minutes
                                    </p>
                                )
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
                </li>
                )
    }
}

export default PodcastItem;