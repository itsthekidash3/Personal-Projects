// Import the OpenAI client configured with API key
import openai from './config/open-ai.js';
// Import readline-sync to get user input from terminal
import readlineSync from 'readline-sync';
// Import colors to add colors to console output
import colors from 'colors';

// Main function that runs the chatbot
async function main() {
    // Display welcome message in green
    console.log(colors.bold.green('Welcome to the ChatBot Program'));
    console.log(colors.bold.green('You can start chatting with the bot'));

    // Store conversation history as array of [role, content] pairs
    const chatHistory = [];

    // Keep chatbot running until user exits
    while (true){
        // Get user input and display prompt in yellow
        const userInput = readlineSync.question(colors.yellow('You: '));
        
        try {
            // Convert chat history from [role, content] arrays to {role, content} objects
            // This transforms the format to what OpenAI API expects
            const messages = chatHistory.map(([role,content]) => ({role, content}))
            
            // Add the latest user input to messages array
            messages.push({role: 'user', content: userInput});

            // Call OpenAI API to get chatbot response
            // Sends all previous messages for context
            const completion = await openai.chat.completions.create({
                model : 'gpt-3.5-turbo',
                messages: messages,
            });
            
            // Extract the text response from the API result
            const completionText = completion.choices[0].message.content;
            
            // Check if user wants to exit
            if (userInput.toLowerCase() === 'exit'){
                console.log(colors.green('Bot: ') + completionText);
                return; // Exit the program
            }

            // Display bot's response in green
            console.log(colors.green('Bot: ') + completionText);

            // Save user message to chat history
            chatHistory.push(['user', userInput]);
            // Save bot's response to chat history for context in next messages
            chatHistory.push(['assistant', completionText]);

        } catch (error) {
            // Display any errors in red
            console.log(colors.red(error));
        }
    }

}

// Start the chatbot program
main();




