// Git API token: 0d1e7657ad6b839893801ef728acd6b514c06cc8

var http = require("http");

var requestOptions = {
  host: "example.com",
  path: "/"
};

http.get(requestOptions, (response) => {

  response.setEncoding("utf8");

  response.on("data", function(data) {
    console.log("Chunk received. Length: ", data);
  });

  response.on("end", function() {
    console.log("Response stream complete");

  });


});
