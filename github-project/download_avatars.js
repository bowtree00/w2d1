// run this in the command line: node download_avatars.js lighthouse-labs laser_shark

var request = require("request");
var fs = require("fs");
require('dotenv').config();

if (process.argv.length > 4) {
  console.log("Too many arguments passed on the command line.");
  console.log("Please provide one repo owner, and one repo name ONLY.");
  return
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {

  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  var authorization = 'token ' + process.env.GITTOKEN // token must be saved in dotenv.

  var info = {
    url: url,
    method: "GET",
    headers: {
      'user-agent': 'request',
      'Authorization': authorization
    }
  };

  request(info, cb);
}


function downloadImageByURL(url, filePath) {
    
  request(url).pipe(fs.createWriteStream(filePath));
  console.log("The file was saved!");

}


// CALLBACK FUNCTION

var cb = function(err, response, data) {

  if (err) {
    console.log("Errors: ", err);
    throw err;
  }

  data = JSON.parse(data);

  console.log(data);

  // GET all avatar_urls - put into an array

  var avatarURLs = [];
  var contributorNames = [];

  data.forEach(function(item){
    avatarURLs.push(item.avatar_url);
    contributorNames.push(item.login);
  });

  // DOWNLOAD each image, save files in a folder

  fs.mkdir("avatars", function(err) {
    if (err) {
      console.log("Folder already exists");
    }
  });

  for (var i = 0; i < avatarURLs.length; i++) {
    var currAvatar = avatarURLs[i];
    var currName = contributorNames[i];
    downloadImageByURL(currAvatar, "avatars/" + currName + ".jpeg");
  }
};

getRepoContributors(repoOwner, repoName, cb);