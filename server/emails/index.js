import { default as request } from 'request'

function fmtSlackUrl(token, channelId) {
  return `https://slack.com/api/channels.info?token=${token}&channel=${channelId}`
}

export function getAllEmails(req, res) {
  console.log('req.body', req.body)

  var channelId = req.body.channel_id

  if (!channelId)
    return res.status(400).json({ errors: 'channel_id required' })

  var token = process.env.SLACK_API_TOKEN
  var url = fmtSlackUrl(token, channelId)
  console.log('url', url)
  request(url, function(error, response, body) {
    console.log('error', error)
    console.log('response.statusCode', response.statusCode)
    console.log('body', body)

    if (error)
      return res.status(400).json({ error: errror })



    if (!error && response.statusCode == 200 && body.ok === true) {
      body.channel.members.forEach((member) => {
        console.log('mem', member)
      })

      res.status(200).json(members)
    } // TODO: else?
  })
}
