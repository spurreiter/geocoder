import assert from 'assert'
import { fixtures } from './fixtures.js'
import { gpxFormatter } from '../../src/index.js'

describe('gpxFormatter', function () {
  it('shall convert forward result', function () {
    assert.deepStrictEqual(
      gpxFormatter(fixtures['135 pilkington avenue, birmingham']),
      `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<wpt lat="52.5487921" lon="-1.8164308339635031"><name>135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom</name></wpt>
</gpx>
`
    )
  })

  it('shall convert reverse result', function () {
    assert.deepStrictEqual(
      gpxFormatter(fixtures['40.714232,-73.9612889']),
      `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<wpt lat="40.714205" lon="-73.96131519274765"><name>279, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States</name></wpt>
</gpx>
`
    )
  })

  it('shall escape chars', function () {
    assert.deepStrictEqual(
      gpxFormatter(fixtures.escape),
      `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<wpt lat="40.714205" lon="-73.96131519274765"><name>&lt;img src=&quot;alert(&#39;test&#39;)&quot;&gt;&amp; others</name></wpt>
</gpx>
`
    )
  })
})
