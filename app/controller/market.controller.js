exports.markets = function (req, res) {
  let baseURL = process.env.MARKET_USER_BASE_URL;
  let axios = require("axios");
  let url = baseURL + "/markets";

  /*
    {
  "result": {
    "assets": [
      {
        "assetId": 1,
        "assetType": "Crypto",
        "decimals": 8,
        "displayDecimals": 5,
        "metadata": {},
        "settles": true,
        "sourceId": 1,
        "status": 1,
        "symbol": "BTC"
      }
    ],
    "sources": [
      {
        "addressExplorer": "https://mempool.space/address/{}",
        "metadata": {
          "network": "Mainnet",
          "scope": "bitcoin",
          "type": "mainnet"
        },
        "name": "bitcoin",
        "sourceId": 1,
        "transactionExplorer": "https://mempool.space/tx/{}"
      }
    ],
    "markets": [
      {
        "baseAssetId": 2,
        "baseLotSize": "1000000000000000",
        "baseMarketIds": [
          100004,
          100005
        ],
        "feeTableId": 1,
        "isImplied": true,
        "isPrimary": true,
        "marketId": 100001,
        "minOrderQty": 10,
        "priceBandAskPct": 500,
        "priceBandBidPct": 20,
        "priceDisplayDecimals": 5,
        "priceTickSize": "0.00001",
        "protectionPriceLevels": 1000,
        "quantityTickSize": "0.001",
        "quoteAssetId": 1,
        "quoteLotSize": "1",
        "status": 1,
        "symbol": "ETHBTC"
      }
    ],
    "feeTables": [
      {
        "feeTableId": 1,
        "feeTiers": [
          {
            "makerFeeRatio": 0.0004,
            "priority": 1,
            "takerFeeRatio": 0.0008
          }
        ]
      }
    ]
  }
}

    */

  const response = axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response)
  console.log(response.data)

  // extract the data from the response

  const markets = response.data.result.markets;

  markets.forEach((market) => {
    const [baseSymbol, quoteSymbol] = market.symbol
      .split(/(BTC|USDT|ETH)/)
      .filter(Boolean);
    const tradingPair = `${baseSymbol}/${quoteSymbol}`;

    console.log(`Đồng: ${baseSymbol}`);
    console.log(`Cặp giao dịch: ${tradingPair}`);
    console.log(`Vol: ${market.baseLotSize}`); // Số lượng giao dịch
    console.log(`Price (USD): ${market.quoteLotSize}`); // Giá USD
    console.log("------------------------");
  });

  // send the response
  res.status(200).send(markets);
};
