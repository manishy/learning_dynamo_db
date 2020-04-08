var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const load = (data)=>{
    var params = {
        TableName: "Movies",
        Item: {
            "year":  data.year,
            "title": data.title,
            "info":  data.info
        }
    };

    docClient.put(params, function(err, info) {
       if (err) {
           console.error("Unable to add movie", data.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", data.title);
       }
    });
}

const loadData = ()=>{
console.log("Importing movies into DynamoDB. Please wait.");
    var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
    console.log(allMovies);
    allMovies.forEach(load);
}

loadData();

