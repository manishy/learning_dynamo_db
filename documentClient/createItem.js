const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const createItem = (params) => {
    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
};


const table = "Movies";
const year = 2015;
const title = "The Big New Movie";
const params = {
    TableName: table,
    Item: {
        "year": year,
        "title": title,
        "info": {
            "plot": "Helllo all",
            "rating": 1
        }
    }
};

createItem(params);
