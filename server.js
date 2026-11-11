const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'fitness_db'
});


//1. api
app.get('/api/berletek', (req, res) => {
    db.query('SELECT megnevezes, nev FROM berletek INNER JOIN tipusok ON tipusok.nev = berletek.megnevezes ORDER BY ar;', (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    });
  });

//2. api
app.get('/api/berletek/elerheto', (req, res) => {
    db.query('SELECT megnevezes FROM berletek WHERE ervenyesseg_nap <= 30;', (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    });
  });

//3. api
app.get('/api/berletek/:szoveg', (req, res) => {
    db.query('SELECT megnevezes FROM berletek WHERE megnevezes LIKE '%havi%';', (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    });
  })

//4. api
app.get('/api/tipusok/statisztika', (req, res) => {
    db.query('', (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    });
  })

//5. api
app.get('/api/berletek/dragak', (req, res) => {
    db.query('SELECT megnevezes, ar FROM berletek WHERE ar >= 20000 ORDER BY ervenyesseg_nap DESC;', (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    });
  })


app.listen(PORT, () => {
    console.log(`Szerver fut a http://localhost:3000 porton`);
  });
  