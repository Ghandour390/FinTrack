const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
};

// إعداد EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (js, css, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db-health', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT 1 AS ok');
    await conn.end();
    res.json({ db: 'ok', rows });
  } catch (err) {
    console.error('DB health check failed:', err.message);
    res.status(500).json({ db: 'error', message: err.message });
  }
});

app.get('/', (req, res) => {
  console.log('Rendering index.ejs');
  res.render('index');
});

app.get('/api', (req, res) => {
  res.send('Hello from the API!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
