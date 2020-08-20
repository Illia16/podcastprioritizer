import React from "react"

const HeaderSection = () => {
  return (
    <header>
      <h1><i className="fas fa-headphones" aria-label="Icon of headphones"></i> Podcast Prioritizer</h1>
      <p>Can't decide which podcast to listen to on your next journey? Not sure whether you should walk, bike or drive? Input your <span role="text">Starting Point</span>, <span role="text">Destination</span>, and a <span role="text">Podcast Search</span> term. Click/tap on a podcast to determine which how you should get to your destination and listen to your podcast in that time.</p>

      <p>To save a podcast for later, log in using your google account by using the menu button in the top right. Once logged in you can save podcasts for later using the 'Save Podcast' button.</p>
    </header>
  )
}

export default HeaderSection;