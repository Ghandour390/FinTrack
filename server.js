require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares: body parsers must be registered before routes
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const userRoutes = require('./routes/users');
const categorieRoutes = require('./routes/categories');
const transactionRoutes = require('./routes/transaction');

app.use('/users', userRoutes);
app.use('/categories', categorieRoutes);
app.use('/transactions', transactionRoutes);



app.get('/', (req, res) => {
  res.render('index');
});



// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
    
