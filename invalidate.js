require('dotenv').config()
require('es6-promise')

const cdnRequest = require('request')
cdnRequest.auth({
  user: process.env.USER, 
  password: process.env.PASSWORD
})

module.exports = (request, response) => {
  return new Promise((resolve, reject) => {
    cdnRequest.post(process.env.CDN_URI, {
      objects: request.body,
      type: 'invalidate'
    }, (cdnError, cdnResponse, cdnBody) => {
      const cdnData = {error: cdnError, response: cdnResponse, body: cdnBody}
      if (cdnError) {
        reject(cdnData)
      }
      response.json(cdnData)
      resolve(cdnData)
    })  
  })
}