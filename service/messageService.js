const isBankSms = require('../utils/messageUtils');  // Import MessagesUtil
const runLLM = require('./llmService');  // Import the runLLM function from LLMService


// Function to process the message
const processMessage = async(message) => {
    if (isBankSms(message)) {
        return runLLM(message);  // Call the LLMService to process the message
    } else {
        return null;
    }
};

// Export the processMessage function
module.exports = { processMessage };
