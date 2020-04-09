const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const put = (params)=>{
    docClient.put(params, function(err, info) {
        if (err) {
            console.error("Unable to add movie", params.Item.title, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", params.Item.title);
        }
    });
};

const load = (data)=>{
    const params = {
        TableName: "Movies",
        Item: {
            "year": data.year,
            "title": data.title,
            "info": data.info
        }
    };
    put(params);
};

const loadDummyData = ()=>{
console.log("Importing movies into DynamoDB. Please wait.");
    const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
    console.log(allMovies);
    allMovies.forEach(load);
};

loadDummyData();

