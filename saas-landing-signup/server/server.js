const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
