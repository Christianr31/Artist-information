// server.cjs

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); //  add this
require('dotenv').config();

const app = express();
const PORT = 3001;

// app.use(cors());
app.use(cors({
  origin: "https://artist-information.vercel.app/"
}));


app.get('/get-token', async (req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).json({ error: 'Missing client ID or secret' });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return res.status(response.status).json({ error: errorDetails });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})