import { default as request } from 'request'

import * as auth from './auth'

function fmtUrl(userId) {
  return `https://slack.com/api/users.info?token=${auth.getToken()}&user=${userId}`
}

export function email(userId, done) {
  request(fmtUrl(userId), (err, response, body) => {
    if (err) return done(err)

    try {
      body = JSON.parse(body)
    } catch (e) {
      return done({ error: e, code: 'cannot_parse_json' })
    }

    if (response.statusCode !== 200 || !body.ok)
      return done({ error: body })

    return done(null, body.user.profile.email)
  })
}
