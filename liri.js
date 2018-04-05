require("dotenv").config();
fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var arg = null;
if(process.argv.length > 3) arg = process.argv[3];

if (command === "do-what-it-says") {
    var data = fs.readFileSync("random.txt", "utf8");
        var arr = data.split(",");
        command = arr[0];
        arg = arr[1];
        console.log(command);
}

if (command === "my-tweets") {
    client.get("statuses/user_timeline", { user_id: "981941238185127936", count: "20" }, function (error, tweets, response) {
        if (error) throw error;
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            console.log(`${tweet.text} ${tweet.created_at}`)
        }
    });
}

if (command === "spotify-this-song") {
    var song;
    if (arg === null) song = "The Sign Ace of Base";
    else song = arg;
    spotify.search({ type: "track", query: song, limit: "1" }, function (error, data) {
        if (error) throw error;
        console.log(`${data.tracks.items[0].name} ${data.tracks.items[0].artists[0].name} ${data.tracks.items[0].album.name} ${data.tracks.items[0].preview_url}`);
    });
}

if (command === "movie-this") {
    var movie;
    if (arg === null) movie = "Mr. Nobody";
    else movie = arg;
    request(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log(info.Title);
            console.log(info.Year);
            console.log(info.imdbRating);
            console.log(info.Ratings[1].Value);
            console.log(info.Country);
            console.log(info.Language);
            console.log(info.Plot);
            console.log(info.Actors);
        }
    });
}