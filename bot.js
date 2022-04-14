console.log("The bot is starting");

require("dotenv").config();
const Twit = require("twit");
const config = require("./config");

const T = new Twit(config);

const getTweet = require("./tweets");

tweetIt();
setInterval(tweetIt, 1000 * 30);

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
