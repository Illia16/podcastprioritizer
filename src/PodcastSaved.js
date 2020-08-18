import React from 'react';

const PodcastSaved = (props) => {
   const { title, listenURL, image, id, deletePodcast} = props
        return(
            <li className="podcastItem">
                <p>{title}</p>
                <div className="podcastImageWrapper">
                    <img src={image} alt={title}></img>
                </div>
                <a href={listenURL}></a>
                <button onClick={(e) => {deletePodcast(e, id)}}>Delete</button>
            </li>
        )
    
}

export default PodcastSaved;