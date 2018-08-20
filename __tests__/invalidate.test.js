jest.setTimeout(1000 * 60 *  5)

const invalidate = require('../invalidate') 

const mockResponse = require('./response.mock')

test('invalidate', done => {
  invalidate({body: ['http://maps.nyc.gov/doitt/webmap/js/dijit/themes/tundra/images/titleBar.png']}, mockResponse)
    .then(data => {
      console.info(data)
    }).catch(data => {
      console.error(data)
    }).finally(() => {
      done()
    })
})