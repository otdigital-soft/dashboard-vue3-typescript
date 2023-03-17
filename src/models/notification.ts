import { DateTime } from "luxon"

class Notification {
  id: string
  createdDateUtc: string
  read: boolean
  subject: string | null

  constructor () {
    this.id = crypto.randomUUID()
    this.createdDateUtc = DateTime.now().toISO()
    this.read = false
    this.subject = null
  }
}

class NotificationDetail extends Notification {
  id: string
  createdDateUtc: string
  readDateUtc: string | null
  read: boolean
  subject: string
  content: string | null

  constructor () {
    super()
    this.id = ""
    this.createdDateUtc = ""
    this.readDateUtc = null
    this.read = false
    this.subject = ""
    this.content = null
  }
}

export { Notification, NotificationDetail }
