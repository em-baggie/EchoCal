// import dotenv library
import dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import open from 'open';
import { OAuth2Client } from 'google-auth-library';
import fs from "fs";
import * as path from "path";
import destroyer from 'server-destroy';

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://127.0.0.1:3000/callback"
);

export async function authenticateUser(): Promise<OAuth2Client> {
    const TOKEN_PATH = path.join(__dirname, "token.json");

    if (fs.existsSync(TOKEN_PATH)) {
        const token_data = fs.readFileSync(TOKEN_PATH, 'utf8');
        const token = JSON.parse(token_data);
        oauth2Client.setCredentials(token);
        return oauth2Client;
    
    } else {
        // Generate a URL that asks permissions for the Google Calendar API
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/calendar.readonly',
            response_type: 'code',
            prompt: 'consent'
        });

    // create server using Node.js http module to handle callback when request is made to /callback and extract the authorisation code
    // authorisation code is exchanged for access/refresh tokens using OAuth client
    // Server starts and automatically opens the browser to the authorization URL, prompting user to log in/grant permissions
    // Use try/catch to catch any errors that arise

    const returnThing = await new Promise((resolve, err) => {
        const server = http.createServer(async function (req, res) {
        try {
            //check if request URL contains /callback (if so, the request is for OAuth callback)
            if (req.url && req.url.includes('/callback')) {
                // creates new URL object and extracts query parameters - contains the authorisation code
                const qs = new URL(req.url, 'http://127.0.0.1:3000').searchParams;
                // indicate authentication was successful
                res.end('Authentication successful!');
                // extract the tokens property from the returned object and assign it to the tokens variavle
                console.log(qs)
                const { tokens } = await oauth2Client.getToken(qs.get('code') as string);
                console.log(tokens)
                // add token to json file
                const tokenJSON = JSON.stringify(tokens, null, 2);
                fs.writeFileSync(TOKEN_PATH, tokenJSON, 'utf8')
                // set the obtained tokens as credentials in the OAuth2 client for future API requests
                oauth2Client.setCredentials(tokens);
                resolve(oauth2Client);
            }
    // handle errors
        } catch (e) {
            if (e instanceof Error) {
                res.end(`Error: ${e.message}`);
            } else {
                res.end(`An unknown error occurred.`);
            }
            server.destroy();
        }
    // define function to execute once server starts listening (callback function)
    }).listen(3000, function() {
    // open browser to authorisation nURL 
    open(authorizeUrl, { wait: false }).then(cp => cp.unref());
    });

    destroyer(server);
    })
    return returnThing as OAuth2Client;
    }

}

