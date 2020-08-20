import React from 'react';
import PodcastSaved from './PodcastSaved';

const PodcastMenu = (props) => {
  const {loggedIn, login, logout, podcastList, deletePodcast} = props

  return(
    <div className="podcastMenu">
        {/* SAVED PODCAST BY CERTAIN USER */}
        {loggedIn ?
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
      {loggedIn ? <button className="loginButton" onClick={logout}>Log Out</button> : <button className="loginButton" onClick={login}>Log In </button>}
    </div>
  )
}

export default PodcastMenu;