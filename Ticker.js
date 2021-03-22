const WebSocket = require('ws');
const API_URL = 'wss://ws-feed.pro.coinbase.com';
const BITCOIN = "BTC-USD";
const ETHEREUM = "ETH-USD"
const SUBSCRIPTION_MESSAGE = `{
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

  constructor(){
    this.bitcoin = 0;
    this.ethereum = 0;
    this.retrieveExchangeRates();
  }
  
  async retrieveExchangeRates() {
    let client = new WebSocket(API_URL);
  
    // Wait for the client to connect using async/await
    await new Promise(resolve => client.once('open', resolve));

    // Whenever websocket sends a new message containing updated prices, update instance variables 
    client.on('message', msg => this.update_prices(msg));
  
    // console.log("Connected to CoinBase Websocket")
    client.send(SUBSCRIPTION_MESSAGE)
  }

  update_prices(message) {
    let asset, price
    [asset, price] = this.parse_message(message);
    switch(asset){
      case BITCOIN:
        this.bitcoin = price;
        break;
      case ETHEREUM:
        this.ethereum = price;
        break;
    }
  }

  parse_price(price_string) {
    return parseFloat(price_string).toFixed(2)
  }
  
  parse_time(time_string) {
    return new Date(time_string)
  }

  parse_message(raw_message) {
    let message = JSON.parse(raw_message)
    if (message["type"] == "ticker") {
      let asset = message["product_id"];
      let price = this.parse_price(message["price"]);
      return([asset, price])
    }
    return [undefined, undefined]
  }
}

module.exports = {Ticker}