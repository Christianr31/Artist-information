import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  const fetchToken = async () => {
    const res = await fetch("http://localhost:3001/get-token");
    const data = await res.json();
    return data.access_token;
  };

  const fetchAllAlbums = async (artistId, token) => {
    let allAlbums = [];
    let url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=20`;

    while (url) {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      allAlbums = [...allAlbums, ...data.items];
      url = data.next;
    }

    return allAlbums;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await fetchToken();

      const artistRes = await fetch(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const artistInfo = await artistRes.json();
      setArtist(artistInfo);

      const allAlbums = await fetchAllAlbums(id, token);
      setAlbums(allAlbums);
    };

    fetchData();
  }, [id]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className="app">
      <Link to="/" className="back-link">
        ← Back to search
      </Link>

      <div className="artist-card">
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
          <strong>Followers:</strong> {artist.followers.total.toLocaleString()}
        </p>
        <p>
          <strong>Popularity:</strong> {artist.popularity}
        </p>
      </div>

      <h3>All Albums & Singles</h3>
      <div className="album-list">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img
              src={album.images[0]?.url || "https://via.placeholder.com/100"}
              alt={album.name}
              width="100"
            />
            <p>{album.name}</p>
            <p className="album-release">{album.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetail;
