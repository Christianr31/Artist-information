import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./artist.css";

import search_icon from "../assets/search.png";
import spotify_logo from "../assets/Spotify_Full_Logo_RGB_Green.png";

const Home = () => {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const fetchToken = async () => {
    const res = await fetch("https://your-render-backend-name.onrender.com/get-token");
    const data = await res.json();
    return data.access_token;
  };

  const searchArtists = async () => {
    if (!query.trim()) return;
    const token = await fetchToken();
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setArtists(data.artists.items);
  };

  const viewArtist = (id) => {
    navigate(`/artist/${id}`);
  };

  return (
    <div className="home">
      <header className="header">
        <img src={spotify_logo} alt="Spotify Logo" />
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchArtists}>
          <img src={search_icon} alt="Search" />
        </button>
      </div>
      <div className="artist-list">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => viewArtist(artist.id)}
          >
            <img
              src={artist.images[0]?.url || ""}
              alt={artist.name}
              className="artist-image"
            />
            <div className="artist-name">{artist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
