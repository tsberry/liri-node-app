require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if(command === "my-tweets") {
    client.get("statuses/user_timeline", {user_id: "981941238185127936", count: "20"}, function(error, tweets, response) {
        if(error) throw error;
        for(var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            console.log(`${tweet.text} ${tweet.created_at}`)
        }
    });
}

if(command === "spotify-this-song") {
    var song = process.argv[3];
    spotify.search({type: "track", query: song, limit: "1"}, function(error, data) {
        if(error) throw error;
        console.log(`${data.tracks.items[0].name} ${data.tracks.items[0].artists[0].name} ${data.tracks.items[0].album.name} ${data.tracks.items[0].preview_url}`);
    });
}

if(command === "movie-this") {

}

if(command === "do-what-it-says") {

}