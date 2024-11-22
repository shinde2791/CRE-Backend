const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const manualDataRoutes = require('./routes/manualDataRoutes');
const userDataRoutes = require('./routes/userDataRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/manual-data', manualDataRoutes);
app.use('/api/user-data', userDataRoutes);

// Default route for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));