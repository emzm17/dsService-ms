require('dotenv').config();
const { Mistral } = require('@mistralai/mistralai');
const expense = require('./expense');



const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral(apiKey);

// Define the llmService function
const runLLM = async (message) => {
    try {
        const response =  await client.chat.complete({
            model: 'mistral-large-latest', // or your preferred model
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert extraction algorithm. Only extract relevant information from the text. If you do not know the value of an attribute asked to extract, return null for the attribute\'s value.'
                },
                { role: 'user', content: message }, // Dynamic user message
            ],
        });

        const structuredResponse = applyStructuredOutput(response.choices[0].message.content);

        return structuredResponse
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

// Assuming that the LLM library supports structured outputs
const applyStructuredOutput = (text) => {
    const amountMatch = text.match(/Amount Spent:\s*(\w+)\s*([\d,.]+)/);
    // Regex to capture the merchant name
    const merchantMatch = text.match(/Merchant:\s*(.+)/);

    const currency = amountMatch ? amountMatch[1] : null;
    const amount = amountMatch ? amountMatch[2] : null;
    const merchant = merchantMatch? merchantMatch[1] : null;
    return {
        currency,amount,merchant
    }
  };

// Export the runLLM function
module.exports = runLLM;
