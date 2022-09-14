/**
 * All Rights Recieved*
 *
 * .
 */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// ............Route Files..........\\

const auth = require('./routes/auth');
const users = require('./routes/users');

const user_profiles = require('./routes/user_profiles');

// Route Files MP
const mp_profiles = require('./routes/mp_profiles');
const mp_ratings = require('./routes/mp_ratings');

const ideas = require('./routes/ideas');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(express.json());

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Core
app.use(cors());

// File Upload
app.use(fileupload());

/**
 * ------------------------Static path----------------------
 *
 */
// Directry Path
var staticResource = '../../storage';

// Set static folder
app.use(express.static(path.join(staticResource, 'public')));

//Mount Router
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/user-profiles', user_profiles);

// Mount Router for MP
app.use('/api/v1/mp-profiles', mp_profiles);
app.use('/api/v1/ratings-mp', mp_ratings);

app.use('/api/v1/ideas', ideas);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unHandled promis rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
