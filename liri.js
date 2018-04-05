require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

var command = process.argv[2];

if(command === "my-tweets") {

}

if(command === "spotify-this-song") {

}

if(command === "movie-this") {

}

if(command === "do-what-it-says") {
    
}