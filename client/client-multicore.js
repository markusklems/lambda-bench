const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const client = require('./client.js');
let promises = [];

if (cluster.isMaster) {
  console.log('Running on ' + numCPUs + ' CPUs.');
  console.log('Launching worker processes.');
  for (let c = 0; c < numCPUs; c++) {
    cluster.fork();
  }
} else {
  console.log('Worker started.');
}

if (!cluster.isMaster) {
  for (let i = 0; i < 12; i++) {
    let start = Date.now();
    let promise = client.invoke(start);
    promises.push(promise);
  }

  Promise.all(promises).then(values => {
    // Output on console
    values.forEach((val) => {
      console.log(val.clientStart + ',' + val.clientDuration + ',' + val.serverDuration);
    });
  });
}
