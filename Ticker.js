const WebSocket = require('ws');
const API_URL = 'wss://ws-feed.pro.coinbase.com';
const BITCOIN = "BTC-USD";
const ETHEREUM = "ETH-USD";
const ASSETS = [BITCOIN, ETHEREUM]
const SUBSCRIPTION_MESSAGE = `{
  "type": "subscribe",
    "product_ids": [
        "${ETHEREUM}",
        "${BITCOIN}"
    ],
    "channels": [
        "level2",
        "heartbeat",
        {
            "name": "ticker",
            "product_ids": [
                "${ETHEREUM}",
                "${BITCOIN}"  
            ]
        }
    ]
}`

class Ticker {

  constructor(){
    this.assetPrices = ASSETS.reduce((acc,curr)=> (acc[curr]=undefined,acc),{});
    this.client = undefined;
  }

  // Opens the connection and waits till all prices are populated before resolving
  async openConnection() {
    this.client = this.client || new WebSocket(API_URL);
  
    // Wait for the client to connect using async/await
    await new Promise(resolve => this.client.once('open', resolve));
    
    this.client.send(SUBSCRIPTION_MESSAGE)

    // Whenever websocket sends a new message containing updated prices, update instance variables 
    await new Promise((resolve, reject) => this.client.on("message", (msg) => {
      this.update_prices(msg) 
      if (this.allPricesPresent()) {
        resolve();
      }
    }));
  }

  closeConnection() {
    this.client.close();
  }

  bitcoin() {
    return this.assetPrices[BITCOIN]
  }

  ethereum() {
    return this.assetPrices[ETHEREUM]
  }
  
  // PRIVATE

  allPricesPresent(){
    let retVal = true;
    for(let asset in this.assetPrices){ retVal = retVal && (this.assetPrices[asset] != undefined) }
    return retVal
  }

  update_prices(message) {
    let asset, price
    [asset, price] = this.parse_message(message);
    if (ASSETS.includes(asset)) {
      this.assetPrices[asset] = price;
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
exports.ticker = Ticker