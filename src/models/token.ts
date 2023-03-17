class Token {
  access_token: string | null

  refresh_token: string | null

  token_type: string | null

  expires: number

  expires_in: number

  scope: string | null

  constructor () {
    this.access_token = null
    this.token_type = null
    this.expires_in = 0
    this.expires = 0
    this.scope = null
    this.refresh_token = null
  }
}

export { Token }
