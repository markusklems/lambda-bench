const AWS = require('aws-sdk');
const region = 'eu-west-1';
const functionName = 'server200ms-dev-server200ms';
const lambda = new AWS.Lambda({ region: region });
AWS.config.update({ region: region });
const params = {
  FunctionName: functionName, /* required */
  InvocationType: 'RequestResponse',
  LogType: 'None',

  //Payload: new Buffer('{"foo": "bar"}'),
};

module.exports.invoke = (start) => {
  let lambdaPromise = lambda.invoke(params).promise();
  let toReturn = new Promise((resolve, reject) => {
    lambdaPromise.then((data) => {
      let duration =  Date.now() - start;
      let val = {};
      val.clientStart = start;
      val.clientDuration = duration;
      val.serverDuration = JSON.parse(data.Payload).duration;
      resolve(val);
    }).catch((err) => {
      console.log(err);
    });
  });

  return toReturn;
};
