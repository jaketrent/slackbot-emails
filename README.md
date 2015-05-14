# slackbot-emails

Get the emails for all the users in the channel.

Returns as csv.

Useful for creating email distribution lists or invite lists to calendar events.

## Installation

Is a node app.  Can run on heroku.  

Requires this env var:

```
SLACK_API_TOKEN=get your own token from https://api.slack.com/web

```

Project setup to use `.env` file in project root

## Running Locally

```
npm install
npm start
```

## Heroku Deploy

```
heroku create my-slack-bot-name
git push heroku master
heroku config:push # all env vars from .env to heroku
heroku open # setup slack integration for this url
```

## API

`POST /*` - get all user emails for the requesting channel

When sent from a slack channel, slack will send the required payload.  Currently `channel_id` is the only required param, sent in the url-encoded request body.
