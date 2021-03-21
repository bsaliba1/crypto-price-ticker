const WebSocket = require('ws');
const api_url = 'wss://ws-feed.pro.coinbase.com'
const initiation_message = `{
    "type": "subscribe",
    "product_ids": [
        "ETH-USD",
        "BTC-USD"
    ],
    "channels": [
        "level2",
        "heartbeat",
        {
            "name": "ticker",
            "product_ids": [
                "ETH-USD",
                "BTC-USD"  
            ]
        }
    ]
}`

class Ticker {
  bitcoin = 0
  ethereum = 0

  constructor(){
    this.retrieveExchangeRates()
  }

  parse_price(price_string) {
    return parseFloat(price_string).toFixed(2)
  }
  
  parse_time(time_string) {
    return new Date(time_string)
  }
  
  parse_message(raw_message) {
    message = JSON.parse(raw_message)
    if (message["type"] == "ticker") {
      asset = message["product_id"]
      price = parse_price(message["price"])
      time = parse_time(message["time"])
      format_output = `Asset: ${asset}| Price: ${price}| Time: ${time}`
      console.log(format_output)
    }
  }
  
  async retrieveExchangeRates() {
  
    client = new WebSocket(api_url);
  
    client.on('message', msg => parse_message(msg));
  
    // Wait for the client to connect using async/await
    await new Promise(resolve => client.once('open', resolve));
  
    console.log("Connected to CoinBase Websocket")
    client.send(initiation_message)
  }
}