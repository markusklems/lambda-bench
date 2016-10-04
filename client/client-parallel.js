const client = require('./client.js');
let promises = [];

for (let i = 0; i < 50; i++) {
  let start = Date.now();
  let promise = client.invoke(start);
  promises.push(promise);
}

Promise.all(promises).then(values => {
  // Output on console
  console.log(values.length + ' measurements:');
  values.forEach((val) => {
    console.log(val.clientStart + ',' + val.clientDuration + ',' + val.serverDuration);
  });
});
