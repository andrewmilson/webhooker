const koa = require('koa');
const exec = require('child_process').exec;
const app = koa();
const configFile = require(process.argv[
  process.argv.indexOf('--config') + 1]);

const routes = new require('koa-router')();

configFile.forEach(function(config) {
  routes.post('/hooks/' + config.id, function *() {
    exec(config[execute-command], (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  });
});

app.use(routes.middleware());
const server = app.listen(9000);
console.log("Listening for webhooks on:" +
  configFile.map(config => '\n + ' +
  'http://localhost:9000/hooks/' + config.id))

npm set init.author.name "Andrew Milson"
npm set init.author.email "andrew.j.milson@gmail.com"
npm set init.author.url "http://andrewmilson.com"
