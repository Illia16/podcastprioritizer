import React from 'react';

const PodcastSaved = (props) => {
   const { title, audio, image, id, deletePodcast} = props
        return(
            <li className="podcastItem">
                <div className="podcastNameImage">
                    <div className="podcastImageWrapper">
                        <img src={image} alt={title}></img>
                    </div>
                    <div className="podcastNameDelete">
                        <p>{title}</p>
                        <button onClick={(e) => { deletePodcast(e, id) }}>X</button>
                    </div>
                </div>

                <audio controls src={audio}>Your browser does not support the audio element.</audio>
            </li>
        )
    
}

export default PodcastSaved;