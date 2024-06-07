exports.markets = function (req, res) {
  let axios = require("axios");
  let url = "https://api.cube.exchange/md/v0/parsed/tickers";

  async function fetchData() {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response data:", response.data);

      let marketsInfo = [];

      response.data.result.forEach((market) => {
        let marketInfo = {
          coin: market.base_currency,
          price: Number(market.last_price).toFixed(4), 
          change_24h: Number(market.last_price - market.open).toFixed(4),
          volume: market.base_volume, 
          percent_change_24h: Number(
            market.last_price - market.open === 0
              ? 0
              : ((market.last_price - market.open) / market.open) * 100
          ).toFixed(4), 
        };

        marketsInfo.push(marketInfo);
      });
      
      res.json(marketsInfo);
    } catch (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching market data" });
    }
  }

  fetchData();
};
