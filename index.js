const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors({
    origin: ['https://www.viiking.tk','https://www.eviiking.tk' ]
}));

const ekoolAuth = require("./routes/ekoolAuth.js")
const scraper = require("./routes/scraper.js")
const payment = require("./routes/payment.js")
const {scrape, scrapeDocx} = require("./scraperOnTimer.js")
//const request = require('request');


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//scrape();
//scrapeDocx();
app.use("/ekool", ekoolAuth);
app.use("/payments", payment);

//app.use("/api", scraper);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server started on port ${port}`));


