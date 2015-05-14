import * as channels from '../slack/channels'

function error(res, err) {
  return res.status(500).json({ error: err })
}

function fmtEmails(emails) {
  return emails.join(', ')
}

export function getAllEmails(req, res) {
  var channelId = req.body.channel_id

  if (!channelId)
    return res.status(400).json({ errors: 'channel_id required' })

  channels.emails(channelId, (err, emails) => {
    if (err) return error(res, err)

    return res.status(200).send(fmtEmails(emails))
  })
}
