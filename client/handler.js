'use strict';

// Function handler
module.exports.client = (event, context, cb) => {
  cb(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// You can add more handlers here, and reference them in serverless.yml
