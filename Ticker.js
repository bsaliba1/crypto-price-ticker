const WebSocket = require('ws');
const api_url = 'wss://ws-feed.pro.coinbase.com';
const BITCOIN = "BTC-USD";
const ETHEREUM = "ETH-USD"
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

function timeout(ms) { //pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Ticker {

  constructor(){
    this.bitcoin = 0;
    this.ethereum = 0;
    this.retrieveExchangeRates();
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
      let time = this.parse_time(message["time"]);
      switch(asset){
        case BITCOIN:
          this.bitcoin = price;
          break;
        case ETHEREUM:
          this.ethereum = price;
          break;
      }
      // Live feed of websocket output
      // let format_output = `Asset: ${asset}| Price: ${price}| Time: ${time}`;
      // console.log(format_output);
    }
  }
  
  async retrieveExchangeRates() {
  
    let client = new WebSocket(api_url);
  
    client.on('message', msg => this.parse_message(msg));
  
    // Wait for the client to connect using async/await
    await new Promise(resolve => client.once('open', resolve));
  
    console.log("Connected to CoinBase Websocket")
    client.send(initiation_message)
  }
}

async function test() {
  await timeout(5000);
  console.log(ticker.bitcoin);
  console.log(ticker.ethereum);
}

// module.exports = {Ticker}
let ticker = new Ticker();
test();