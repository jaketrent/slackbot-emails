import { default as request } from 'request'

import * as auth from './auth'
import { default as Cache } from '../common/cache'

const usersCache = new Cache()

function fmtUrl(userId) {
  return `https://slack.com/api/users.info?token=${auth.getToken()}&user=${userId}`
}

function fmtEmail(user) {
  return user.profile.email
}

export function email(userId, done) {
  var cachedUser = usersCache.at(userId)
  if (cachedUser)
    return done(null, fmtEmail(cachedUser))

  request(fmtUrl(userId), (err, response, body) => {
    if (err) return done(err)

    try {
      body = JSON.parse(body)
    } catch (e) {
      return done({ error: e, code: 'cannot_parse_json' })
    }

    if (response.statusCode !== 200 || !body.ok)
      return done({ error: body })

    usersCache.put(userId, body.user)

    return done(null, fmtEmail(body.user))
  })
}
