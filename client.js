require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')

const { ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

const [,, uri, method, body] = process.argv
if (!uri) {
  console.log('Usage: node client {url} [{method}] [{jsonData}]')
  process.exit(1)
}

const sendAPIRequest = async () => {
  try {
    const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    const auth = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`
      },
      form: {
        grant_type: 'client_credentials',
        scope: SCOPE
      }
    })

    const response = await request({
      uri,
      method,
      body,
      headers: {
        'content-type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`
      }
    })

    console.log(response)
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

sendAPIRequest()
