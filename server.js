const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// require("./app/routes/user.route")(app);
require("./app/routes/market.route")(app);
// require("./app/routes/marketdata.route")(app);
// require("./app/routes/trade.route")(app);
