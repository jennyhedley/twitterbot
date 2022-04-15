console.log("Anne bot is starting");

require("dotenv").config();
const cron = require("node-cron");
const Twit = require("twit");
const config = require("./config");
const T = new Twit(config);
const getTweet = require("./tweets");

// Tweet every day at 5am 10am and 5pm
cron.schedule("0 5,10,17 * * *", () => {
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
