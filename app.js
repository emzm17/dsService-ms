// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs');
const {processMessage} = require('./service/messageService'); // Custom service for processing message

// Initialize Express app
const app = express();

const kafka = new Kafka({
    clientId: 'dsService',
    brokers: ['kafka:9092'] // Change this to your Kafka broker address
  });
const producer = kafka.producer();


const runProducer = async (message) => {
    await producer.connect();
    await producer.send({
      topic: 'expense-service', // Replace with your topic name
      messages: [
        { value: JSON.stringify(message) },
      ],
    });
    await producer.disconnect();
  };
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
    // console.log(result);
    runProducer(result);
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
