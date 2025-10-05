const express = require('express');
const session = require('express-session');
const routeTransaction = require('./routes/transaction');


const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;
const dbConfig = require('./config/config.js');
const RouteBudget = require('./routes/budgue');
const RouteUsers = require('./routes/users');

app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (after body parsers)
app.use('/budgues', RouteBudget);
app.use('/api/budgues',RouteBudget);
app.use('/transactions', routeTransaction);
app.use('/api/transactions', routeTransaction);

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// route 
app.use('/users', RouteUsers);


app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/db-health', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig.development);
    await connection.execute('SELECT 1');
    await connection.end();
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'Disconnected', error: error.message });
  }
});


app.get('/dashboard', require('./controller/DashboardController').getDashboard);





app.get("/", (req, res)=>{
  res.render('index')

})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});