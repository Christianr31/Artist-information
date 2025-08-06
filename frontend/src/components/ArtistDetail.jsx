import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./artist.css";

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  const fetchToken = async () => {
    const res = await fetch("https://your-render-backend-name.onrender.com/get-token");
    const data = await res.json();
    return data.access_token;
  };

  useEffect(() => {
    const fetchArtist = async () => {
      const token = await fetchToken();
      const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setArtist(data);
    };
    fetchArtist();
  }, [id]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className="artist-detail">
      <h1>{artist.name}</h1>
      <img
        src={artist.images[0]?.url || ""}
        alt={artist.name}
        className="artist-image-large"
      />
      <p>Followers: {artist.followers.total.toLocaleString()}</p>
      <p>Genres: {artist.genres.join(", ")}</p>
      <p>Popularity: {artist.popularity}</p>
    </div>
  );
};

export default ArtistDetail;

