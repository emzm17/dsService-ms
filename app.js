// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const {processMessage} = require('./service/messageService'); // Custom service for processing message

// Initialize Express app
const app = express();

// Configure middleware
app.use(bodyParser.json()); // Parses incoming JSON requests

// Initialize message service

// Route for handling POST request
app.post('/v1/ds/message', async(req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const result = await processMessage(message);
    res.json(result);
});

// Route for handling GET request
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
