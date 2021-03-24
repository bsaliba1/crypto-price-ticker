# Crypto Price Ticker
## Installation
```
npm install crypto-price-ticker
```
## Un-installation
```
npm un crypto-price-ticker
```

## Usage
### Initialization
```
const CoinbaseTicker = require("crypto-price-ticker")

let ticker = new CoinbaseTicker.Ticker();
```

### Opening Connection to Coinbase WebSocket API
```
ticker.openConnection()
```

### Closing Connection to Coinbase WebSocket API
```
ticker.closeConnection()
```

### Getting Market Price Data
```
ticker.bitcoin() // gets Bitcoin market price at that moment
ticker.ethereum() // gets Ethereum market price at that moment
```