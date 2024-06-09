// import dotenv library
import dotenv from 'dotenv';
dotenv.config();

// import modules
import { exec } from 'child_process';
import { google } from 'googleapis';
import { authenticateUser } from './authentication'
import { promisify } from 'util';
const asyncExec = promisify(exec);

// use path module to create path to speech.mp3
// ensures file can always be found, and is compatible with different operating systems

async function say(text: string) {
    await asyncExec(`say -v 'Fiona' "${text}"`);
}

async function sleep (ms: number) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms)});
}

let alreadySaid = new Set();

async function main() {
    try {
        const oauth2Client = await authenticateUser();
        async function listEvents() {
            const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const response = await calendar.events.list({
                calendarId: 'primary',
                timeMin: now.toISOString(),
                timeMax: tomorrow.toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });
            // Function to list events and schedule TTS reminders
            const events = response.data.items
            if (events) {
                for (const event of events) {
                    const start = new Date(event.start?.dateTime || event.start?.date || '');
                    const eventTitle = event.summary || 'No Title';
                    const eventDescription = event.description || 'No Description';
                    const reminderTime = new Date(start.getTime() - 5 * 60 * 1000);
                    const time = Date.now();
                    if (reminderTime.valueOf() <= time) {
                        if (!alreadySaid.has(event.id! + event.start?.dateTime)) {
                            await say(`Event starting in ${(Math.floor((start.getTime()-time)/(60 * 1000)))} minutes: ${eventTitle}. ${eventDescription}`);
                        }
                        alreadySaid.add(event.id! + event.start?.dateTime);
                    }
                }
            }
        }
        while (true) {
            await listEvents();
            await sleep(30000)
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
    // Function to list events
}
main();
