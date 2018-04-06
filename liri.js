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
if (process.argv.length > 3) arg = process.argv.splice(3, process.argv.length - 3).join(" ");

if (command === "do-what-it-says") {
    var data = fs.readFileSync("random.txt", "utf8");
    var arr = data.split(",");
    command = arr[0];
    arg = arr.splice(1, arr.length - 1).join(" ");
    console.log(command);
}

if (command === "my-tweets") {
    client.get("statuses/user_timeline", { user_id: "981941238185127936", count: "20" }, function (error, tweets, response) {
        if (error) throw error;
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            console.log(
                `
Tweet: ${tweet.text}
Tweeted at: ${tweet.created_at}`);
        }
    });
}

if (command === "spotify-this-song") {
    var song;
    if (arg === null) song = "The Sign Ace of Base";
    else song = arg;
    spotify.search({ type: "track", query: song, limit: "10" }, function (error, data) {
        if (error) throw error;
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(`
Result ${i+1}
Track Name: ${data.tracks.items[i].name}
Artist: ${data.tracks.items[i].artists[0].name}
Album: ${data.tracks.items[i].album.name}
Preview Link: ${data.tracks.items[i].preview_url}`);
        }
    });
}

if (command === "movie-this") {
    var movie;
    if (arg === null) movie = "Mr. Nobody";
    else movie = arg;
    request(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log(`
Title: ${info.Title}
Year: ${info.Year}
IMDB Rating: ${info.imdbRating}
Rotten Tomatoes Rating: ${info.Ratings[1].Value}
Country: ${info.Country}
Language: ${info.Language}
Plot: ${info.Plot}
Actors: ${info.Actors}`);
        }
    });
}