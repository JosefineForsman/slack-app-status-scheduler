## StatusCheck

Overview
StatusCheck is a Slack application built with Next.js and deployed on Vercel. It features a connected dashboard for managing weekly work statuses. Users can select their status for each of the next five work days via a Slack app. The data is stored in a Supabase database, and a reminder is sent to users every Monday. The dashboard dynamically updates to reflect current statuses.

## Features
- Modal for status selection via Slack shortcut.
- Data stored in Supabase database.
- Reminder functionality for users to input their weekly schedule.
- Dynamic dashboard reflecting current statuses.

## Technologies
- Next.js
- Vercel
- Slack Bolt
- Supabase
- NextConnectReceiver
- Cron-Jobs.org

## Important Information
To make the interactions work well with Vercel and the Slack app, I used this article:
https://medium.com/@alibadereddin/building-the-backend-for-a-slack-app-with-nextjs-and-vercel-e1503b938e6b
to understand how to work around and use a Vercel URL with a Slack app to handle interactions by Ali BaderEddin.

