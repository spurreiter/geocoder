const escQuote = (s) => String(s).replace(/"/g, '\\"')

const escXml = (s) =>
  (s || '').replace(/&amp;/g, '&').replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
  )

const gpxWaypoint = ({ latitude, longitude, formattedAddress }) => `
<wpt lat="${escQuote(latitude)}" lon="${escQuote(longitude)}"><name>${escXml(
  formattedAddress
)}</name></wpt>`

export const gpxFormatter = (results) => `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">${results.map(
  gpxWaypoint
)}
</gpx>
`
