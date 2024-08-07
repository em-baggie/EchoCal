<h1 align="center">
    <img src="https://raw.githubusercontent.com/em-baggie/EchoCal/main/EchoCal_logo.webp" alt="wells score logo" height="250">
    <br/>
    EchoCal
</h1>

## Overview

Welcome to EchoCal - an open source CLI application which fetches data from Google Calendar events and provides real-time audible alerts to the user shortly before they begin. Designed for accessibility, the app runs in the background ensuring users do not miss notifications when away from the screen.

## Current features
- Reads calendar event name and description 5 minutes prior to event
- Avoids repeating the same event more than once
- Checks for new events every 30 seconds
- If an event time is changed, it identifies this as new event to be read

## Areas for further development
- Incorporation of a webhook to optimise event fetching
- Support for mid-event reminders
- Options to change type of voice

## How to install/run

1. `git clone` this repo
2. `npm install`
3. Obtain credentials:

   1. Visit `https://console.cloud.google.com/home` > log in to google account
   2. Create new project
   3. APIs & Services > credentials > create credentials > OAuth client ID > configure consent screen
   4. User type: external > create
   5. Input app name, input your email as user support email and developer email > save & continue
   6. Add the below scopes before clicking save and continue:<br>
        ...`/auth/calendar.calendarlist.readonly`<br>
        ...`/auth/calendar.events.public.readonly`<br>
        ...`/auth/calendar.readonly`<br>
        ...`/auth/calendar.calendars.readonly`<br>
        ...`/auth/calendar.events.owned.readonly`<br>
        ...`/auth/calendar.events.readonly`<br>
5. Add users > Add your email as a test user > add > save and continue > back to dashboard
7. Go back to credentials > create credentials > OAuth client ID
8. Select web application as application type
9. Add authorized redirect URI as `http://127.0.0.1:3000/callback` > create
10. Copy the client secret and client ID and add to a `.env` file in the same directory as the cloned repo formatted like below:<br>
    `GOOGLE_CLIENT_ID = <insert id>`<br>
    `GOOGLE_CLIENT_SECRET = <insert secret>`<br>
11. `cd EchoCal`
12. `npx tsx main.ts` to run
13. `Ctrl+C` to stop

## Tech stack used
- TypeScript
- JavaScript (Node.js)
- Google APIs
