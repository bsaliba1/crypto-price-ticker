const CoinbaseTicker = require('./ticker')

function timeout(ms) { //pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function example(){
  let ticker = new CoinbaseTicker.Ticker();
  await ticker.openConnection();
  console.log(`Bitcoin price: ${ticker.bitcoin()}`);
  console.log(`Ethereum price: ${ticker.ethereum()}`);
  await timeout(1200);
  console.log(`Bitcoin price: ${ticker.bitcoin()}`);
  console.log(`Ethereum price: ${ticker.ethereum()}`);
  ticker.closeConnection();
}

example();