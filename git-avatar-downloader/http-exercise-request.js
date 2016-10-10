var url = process.argv[2];

var request = require("request");

url = "http://" + url;

console.log(url);


request(url, function(err, response, body) {
  
  if (err) {
    throw err;
  }

  // console.log("response: ",  response.statusCode);
  console.log("body: ", body);

});