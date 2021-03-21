const https = require('https');

let options = {
  method: 'GET',
  hostname: 'blockchain.info',
  path: '/tobtc?currency=USD&value=1',
  port: 443,
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  let response = ""
  res.on('data', d => {
    response += d.toString()
  })
  res.on('end', () => {
    let data = Number(response)
    console.log(`1 USD = ${data} BTC`)
    console.log(`1 BTC = ${1/data} USD`)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()