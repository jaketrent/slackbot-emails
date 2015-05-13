import * as emails from '../emails'

export function map(app) {
  app.post('/', emails.getAllEmails)
}
