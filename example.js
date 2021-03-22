const { Ticker } = require('./Ticker')

function timeout(ms) { //pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function example(ticker) {
  await timeout(5000);
  console.log(ticker.bitcoin);
  console.log(ticker.ethereum);
}

let ticker = new Ticker();
example(ticker);