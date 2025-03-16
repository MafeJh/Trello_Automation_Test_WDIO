// require('dotenv').config();
import { readFileSync } from 'fs';
import { run } from 'newman';
import collection from './TrelloAPITestsCollection.json' with { type: 'json' };
import environment from './TrelloEnvironment.json' with { type: 'json' };

// Function to load environment variables from a .env file
function loadEnv(filePath) {
    const env = readFileSync(filePath, 'utf8');
    env.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

// Load environment variables from .env file
loadEnv('./.env');

// Replace placeholders with actual environment variables
environment.values.forEach(variable => {
    if (variable.key === 'apiKey') {
        variable.value = process.env.API_KEY;
        console.log("API_KEY: " + variable.value);
        
    } else if (variable.key === 'apiToken') {
        variable.value = process.env.API_TOKEN;
        console.log("API_TOKEN: " + variable.value);
    }
});

run({
    collection,
    environment,
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('Collection run complete!');
});