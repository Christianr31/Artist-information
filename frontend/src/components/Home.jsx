// src/components/Home.jsx
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

  // const fetchToken = async () => {
  //   const res = await fetch("http://localhost:3001/get-token");
  //   const data = await res.json();
  //   return data.access_token;
  // };
  const fetchToken = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-token`);
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
    <div className="app">
      {/* Header */}
      <div className="header">
        <img src={spotify_logo} alt="Spotify Logo" />
        <h1>Artist Information</h1>
      </div>

      {/* Search Bar */}
      <div className="artist">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchArtists()}
          />
          <img src={search_icon} alt="search" onClick={searchArtists} />
        </div>
      </div>

      {/* Search Results */}
      <div className="artist-list">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => viewArtist(artist.id)}
          >
            <img
              src={artist.images[0]?.url || "https://via.placeholder.com/150"}
              alt={artist.name}
              width="150"
            />
            <h2>{artist.name}</h2>
            <p>
              <strong>Genres:</strong> {artist.genres.join(", ")}
            </p>
            <p>
              <strong>Followers:</strong>{" "}
              {artist.followers.total.toLocaleString()}
            </p>
            <p>
              <strong>Popularity:</strong> {artist.popularity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;