// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// const dotenv = require('dotenv');
// const path=require('path')

// dotenv.config();

// const _dirname = path.resolve();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//      origin: 'http://localhost:5000' // Replace with your frontend URL
//    }));
// app.use(express.json());
// app.use(express.static(path.join(_dirname, "/frontend/dist")));


// // Database connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost', // Add quotes around default values
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_NAME || 'ulogin',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection error:', err);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// // Login route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log(`Received login attempt with username: ${username}, password: ${password}`);

//   // Query the database for user data
//   const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//             res.json({ success: false, message: 'Internal server error' });

//     } else if (results.length > 0) {
//       res.json({ success: true, message: 'Login successful!' });
//     } else {
//                   res.json({ success: false, message: 'Invalid username or password' });

//     }
//   });
// });


// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const _dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Allow both development and production URLs
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'ulogin',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Enhanced error handling for login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
