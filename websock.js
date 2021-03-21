const WebSocket = require('ws');
const message = `{
  "type": "hello",
  "apikey": "2995043B-4497-448F-A913-2C3A04584C6E",
  "heartbeat": false,
  "subscribe_data_type": ["trade"],
  "subscribe_filter_symbol_id": [
    "BITSTAMP_SPOT_BTC_USD$",
    "BITFINEX_SPOT_BTC_LTC$",
    "COINBASE_",
    "ITBIT_"
    ]
}`

async function test() {

  client = new WebSocket('wss://ws.coinapi.io/v1/');

  client.on('message', msg => console.log(msg));

  // Wait for the client to connect using async/await
  await new Promise(resolve => client.once('open', resolve));

  console.log("Connected to CoinAPI Websocket")
  let response = await client.send(message)
}

test()