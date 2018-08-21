require('dotenv').config()
require('es6-promise')

const Client = require('node-rest-client').Client

module.exports = (request, response) => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      user: process.env.CDN_USER,
      password: process.env.CDN_PASSWORD
    })
    client.post(process.env.CDN_URI, {
      headers: {'Content-Type': 'application/json'},
      data: {
        objects: request.body,
        action: 'invalidate'
      }
    }, (cdnData, cdnResponse) => {
      const status = cdnResponse.statusCode
      if (status === 201) {
        response.json(cdnData)
        resolve(cdnData)
      } else if (status === 400) {
        response.status(status).json(cdnData)
        reject(cdnData)
      } else {
        response.status(status).json({message: cdnResponse.statusMessage})
        reject({message: cdnResponse.statusMessage})
      }
    })  
  })
}