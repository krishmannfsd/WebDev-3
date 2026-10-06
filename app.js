const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser Middleware
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Base Route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Student Management REST API');
});

// Modular Routes
app.use('/students', studentRoutes);

// Handle Undefined / 404 Routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});