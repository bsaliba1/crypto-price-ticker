const https = require('https');

let options = {
  method: 'GET',
  hostname: 'blockchain.info',
  path: '/tobtc?currency=USD&value=5000',
  port: 443,
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