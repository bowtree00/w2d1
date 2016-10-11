var request = require("request");
var fs = require("fs");
// require('dotenv').config();

var repoOwner = process.argv[2];
var repoName = process.argv[3];


function getRepoContributors(repoOwner, repoName, cb) {

  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var info = {
    url: url,
    method: "GET",
    headers: {
      'user-agent': 'request',
      'Authorization': 'token ' + "0d1e7657ad6b839893801ef728acd6b514c06cc8" // token must be saved in dotenv.
    }
  }
  
  // console.log("info ", info);

  request(info, cb);
}


function downloadImageByURL(url, filePath) {
    
    request(url).pipe(fs.createWriteStream(filePath));

    // var info = {
    //   url: url,
    //   method: "GET",
    //   headers: {
    //     'user-agent': 'request',
    //     'Authorization': 'token ' + "0d1e7657ad6b839893801ef728acd6b514c06cc8" // token must be saved in dotenv.
    //   }
    // }

    // request(info, function(err, response, data) {
    //   if (err) {
    //     throw err;
    //     console.log("err ", err);
    //   }

    //   // console.log(data);
    //   var image = fs.createWriteStream(filePath);
    //   image.write(data);
    //   image.end();

    //   // write data to file.
    //   // fs.writeFile(filePath, data, function(err) {
    //   //   if (err) {
    //   //     return console.log("Error! ", err);
    //   //   }
    //   //   console.log("The file was saved!")
    //   // });

    // });

  }




// CALLBACK FUNCTION
var cb = function(err, response, data) {

  if (err) {
    throw err;
    console.log("Errors: ", err);
  }

  data = JSON.parse(data);
  // console.log("Data: ", data[0]);

  // GET all avatar_urls - put into an array
  avatarURLs = [];
  data.forEach(function(item){
    avatarURLs.push(item.avatar_url);
  });

  // console.log("avatarURLs ", avatarURLs);

  // DOWNLOAD each image, save files in a folder
  i=0;
  avatarURLs.forEach(function(item) {
    downloadImageByURL(item, "avatar-images/image" + i + ".jpeg");
    i++;
  });

}



getRepoContributors(repoOwner, repoName, cb);
// getRepoContributors("lighthouse-labs", "laser_shark", cb);



