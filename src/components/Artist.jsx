import React from 'react'
import './artist.css' 
import search_icon from "../assets/search.png"
import spotify_logo from "../assets/Spotify_Full_Logo_RGB_Green.png"

const Artist = () => {
  return (
    <div>
     <div className="header">
            <img src={spotify_logo} alt="Spotify Logo"/>
            <h1>Artist information</h1>
        </div>
    
    <div className='artist'>
        
        
        <div className="search-bar">
            <input type ="text" placeholder="Search"/>
            <img src={search_icon} alt=""/>
        </div>
        
    </div>
    </div>
  )
}

export default Artist