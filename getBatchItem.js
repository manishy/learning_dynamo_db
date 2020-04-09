const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const getBatchItem = (params)=>{
    ddb.batchGetItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            data.Responses.Movies.forEach(function (element, index, array) {
                    console.log(JSON.stringify(element,0,2));
                }
            );
        }
    });
};

const params = {
    RequestItems: {
        'Movies': {
            Keys: [
                {'year': {N: '2015'}, 'title': {S: 'The Big New Movie'}},
                {'year': {N: '2016'}, 'title': {S: 'The Big New Movie'}},
            ],
            ProjectionExpression: 'title'
        }
    }
};

getBatchItem(params);
