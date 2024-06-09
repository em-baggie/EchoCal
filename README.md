<h1 align="center">
    <img src="" alt="EchoCal logo" height="200">
    <br/>
    EchoCal
</h1>

## Overview

Welcome to EchoCal - a CLI app which reads your google calendar events aloud as a verbal reminder before they occur.

## Features
- Reads calendar event name and description 5 minutes prior to event
- Avoids repeating the same event more than once
- Checks for new events every 30 seconds
- If event time is changed, identifies as new event to be read

## How to install/run

1. `git clone` this repo
2. `npm install`
3. Obtain credentials:

   1. Visit https://console.cloud.google.com/home > log in to google account
   2. Create new project
   3. APIs & Services > credentials > create credentials > OAuth client ID > configure consent screen
   4. User type: external > create
   5. Input app name, input your email as user support email and developer email > save & continue
   6. Add the below scopes:
   .../auth/calendar.calendarlist.readonly
   .../auth/calendar.events.public.readonly
   .../auth/calendar.readonly
   .../auth/calendar.calendars.readonly
   .../auth/calendar.events.owned.readonly
   .../auth/calendar.events.readonly
       > save and continue
5. Add users > Add your email as a test user > add > save and continue > back to dashboard
7. Go back to credentials > create credentials > OAuth client ID
8. Select web application as application type
9. Add authorized redirect URI as `http://127.0.0.1:3000/callback` > create
10. Copy the client secret and client ID and add to a `.env` file in the same directory as the cloned repo formatted like below:
    GOOGLE_CLIENT_ID = <insert id>
    GOOGLE_CLIENT_SECRET = <insert secret>
11. `cd Echo Cal`
12. `run npx tsx main.ts` to run
13. control C to stop

### Tech stack used
- TypeScript
- JavaScript (Node.js)
- Google APIs
