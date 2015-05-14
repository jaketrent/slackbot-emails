import { default as request } from 'request'

import * as auth from './auth'
import * as users from './users'

function fmtUrl(channelId) {
  return `https://slack.com/api/channels.info?token=${auth.getToken()}&channel=${channelId}`
}

export function userIds(channelId, done) {
  request(fmtUrl(channelId), (err, response, body) => {
    if (err) return done(err)

    try {
      body = JSON.parse(body)
    } catch (e) {
      return done({ error: e, code: 'cannot_parse_json' })
    }

    if (response.statusCode !== 200 || !body.ok)
      return done({ error: body })

    var userIds = body.channel.members.map((userId) => {
      return userId
    })

    return done(null, userIds)
  })
}

export function emails(channelId, done) {
  userIds(channelId, (userIdErr, userIds) => {
    if (userIdErr) return done(userIdErr)

    var emails = []
    var numEmailsRemaining = userIds.length

    userIds.forEach((userId) => {
      users.email(userId, (emailErr, email) => {
        if (emailErr) return done(emailErr)

        // TODO: cache emails
        emails.push(email)
        numEmailsRemaining--

        if (numEmailsRemaining <= 0)
          return done(null, emails)
      })
    })
  })
}
