const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: '123456',
  database: 'music_db',
  port: 5432 // PostgreSQL default port
});

app.get('/artists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while fetching artists');
  }
});

app.post('/artists', async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query('INSERT INTO artists (name) VALUES ($1)', [name]);
    res.status(201).send('Artist added successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while adding artist');
  }
});

app.get('/albums', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM albums');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while fetching albums');
  }
});

app.get('/songs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM songs');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while fetching songs');
  }
});

app.post('/songs', async (req, res) => {
  const { title, artist_id } = req.body;
  try {
    await pool.query('INSERT INTO songs (title, artist_id) VALUES ($1, $2)', [title, artist_id]);
    res.status(201).send('Song added successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while adding song');
  }
});

app.get('/playlists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM playlists');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while fetching playlists');
  }
});

app.get('/playlist_songs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM playlist_songs');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('An error occurred while fetching playlist songs');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));