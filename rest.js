const https = require('https');

let options = {
  method: 'GET',
  hostname: 'rest.coinapi.io',
  path: '/v1/exchangerate/BTC/USD?time=2021-03-20T00:00:00',
  port: 443,
  headers: {
    'X-CoinAPI-Key': "2995043B-4497-448F-A913-2C3A04584C6E"
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()