var url = process.argv[2];

// var url = "www.example.com";

function readHTML (url, callback) {
// The function should make a request to the URL, read the full HTML of the page, and then pass the complete HTML data to the callback function.
// Since the data arrives in chunks, how can you ensure the callback function receives the full HTML?
// Keep in mind that http.get() takes an object of options such as host and path. Just like in the example, you will need to define a similar object inside your function that uses the url you passed in.
// For simplicity, test it with the URL 'example.com' first, but once it works you can try it with other websites if you wish.

  var http = require("http");

  var requestOptions = {
    host: url,
    path: "/"
  }

  http.get(requestOptions, function(response) {

    response.setEncoding("utf8");

    response.on("data", function(data) {

      console.log("==============================");
      console.log("Chunk received. Length: ", data.length);
      console.log("==============================");

      data += data; // concatenate incoming data stream chunks

      callback(data); // this calls our callback 'printHTML'
      
    });

    response.on("end", function() {
      console.log("Response stream complete. ");
    });

  });

}


function printHTML (htmlData) {
  console.log("htmlData:", htmlData);
}

readHTML(url, printHTML);

