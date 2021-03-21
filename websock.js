const WebSocket = require('ws');
const hello_message = `{
  "type": "hello",
  "apikey": "2995043B-4497-448F-A913-2C3A04584C6E",
  "heartbeat": false,
  "subscribe_data_type": ["trade"],
  "subscribe_filter_symbol_id": [
    "BITSTAMP_SPOT_BTC$",
    "BITFINEX_SPOT_BTC$",
    "COINBASE_BTC$",
    "ITBIT_BTC$"
    ]
}`

function parse_message(message) {
  // if (message["type"] == "exrate") {
    console.log(message)
  // }
}

async function test() {

  client = new WebSocket('wss://ws.coinapi.io/v1/');

  client.on('message', msg => parse_message(msg));

  // Wait for the client to connect using async/await
  await new Promise(resolve => client.once('open', resolve));

  console.log("Connected to CoinAPI Websocket")
  client.send(hello_message)
}

test()