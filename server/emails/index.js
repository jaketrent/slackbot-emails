import { default as request } from 'request'

function fmtSlackUrl(token, channelId) {
  return `https://slack.com/api/channels.info?token=${token}&channel=${channelId}`
}

export function getAllEmails(req, res) {
  var channelId = req.body.channel_id
  var token = process.env.SLACK_API_TOKEN

  console.log(require('util').inspect(res.body)({ depth: 5 }))
  request(fmtSlackUrl(token, channelId), function(error, response, body) {
    if (!error && response.statusCode == 200 && body.ok === true) {
      body.channel.members.forEach((member) => {
        console.log('mem', member)
      })

      res.status(200).json(members)
    } // TODO: else?
  })
}
