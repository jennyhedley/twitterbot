console.log("Anne bot is starting");

const express = require("express");
const app = express();
app.set("port", process.env.PORT || 5000);

//For avoiding Heroku $PORT error
app
  .get("/", function (request, response) {
    const result = "App is running";
    response.send(result);
  })
  .listen(app.get("port"), function () {
    console.log(
      "App is running, server is listening on port ",
      app.get("port")
    );
  });

//prevent idle with 20 minute ping - haven't tested
// using http://kaffeine.herokuapp.com/ with 16:45 GMT bedtime
// const http = require("http");
// setInterval(function() {
//     http.get("http://annebotwallace.herokuapp.com");
// }, 1000 * 60 * 20); // every 20 minutes



require("dotenv").config();
const cron = require("node-cron");
const Twit = require("twit");
const config = require("./config");
const T = new Twit(config);
const getTweet = require("./tweets");

// Tweet every day at 9am 12n and 5pm locally GMT 2,7,23
cron.schedule("0 2,7,23 * * *", () => {
  tweetIt();
});

// tweetIt();
// setInterval(tweetIt, 1000 * 60 * 60 * 6);

function tweetIt() {
  const tweet = {
    status: getTweet(),
  };

  T.post("statuses/update", tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("It worked");
    }
  }
}
