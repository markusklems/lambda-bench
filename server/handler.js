'use strict';

// Function handler
module.exports.server = (event, context, cb) => {
  let start = Date.now();
  setTimeout(() => {
    // timeout = 6 seconds
    let duration = 6000 - context.getRemainingTimeInMillis();
    let duration2 = Date.now() - start;
    cb(null, { duration: duration, duration2: duration2 });
  }, 200);

};

// You can add more handlers here, and reference them in serverless.yml
