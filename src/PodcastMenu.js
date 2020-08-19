import React from 'react';
import PodcastSaved from './PodcastSaved';

const PodcastMenu = (props) => {
    const {user, login, logout, podcastList, deletePodcast} = props
    return(
        <div className="podcastMenu">

            {/* SAVED PODCAST BY CERTAIN USER */}
            {user ?
                <ul className="podcastUserList">
                    {
                        podcastList.map((podcastItem) => {
                            const { key, podcasts } = podcastItem
                            return (
                                <PodcastSaved key={key} title={podcasts.title} image={podcasts.image} audio={podcasts.audio} deletePodcast={deletePodcast} id={key} />
                            )
                        })
                    }
                </ul>
                : null}

            {/* Log In/ Log Out button */}
            {user ? <button className="loginButton" onClick={logout}>Log Out</button> : <button onClick={login}>Log In </button>}

        </div>
    )
}

export default PodcastMenu;