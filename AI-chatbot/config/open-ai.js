// Import OpenAI class to interact with the API
import OpenAI from 'openai';

// Import dotenv to load environment variables from .env file
import dotenv from 'dotenv';

// Load environment variables (like API key) from .env file into process.env to access the values
dotenv.config()

// Initialize the OpenAI API client with your API key
// The API key is stored in the .env file for security
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
