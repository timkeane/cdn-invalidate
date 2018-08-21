jest.setTimeout(1000 * 60 *  5)
require('es6-promise')

const invalidate = require('../invalidate') 

const mockResponse = require('./response.mock')

test('invalidate', done => {
  invalidate({body: ['http://maps.nyc.gov/doitt/webmap/js/dijit/themes/tundra/images/titleBar.png']}, mockResponse)
    .then(cdnResponse => {
      console.warn(cdnResponse);
      done()
    }).catch(cdnResponse => {
      console.error(cdnResponse);
      done()
    })
})