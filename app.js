#!/usr/bin/env node

var express = require('express')
var app = express()
var configFile = require(process.argv[
  process.argv.indexOf('--config') + 1]);

configFile.forEach(function(config) {
  app.get('/hooks/' + config.id, function(req, res) {
    console.log("YOW")
    exec(config['execute-command'], (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  })
});

app.listen(9909)
console.log("Listening for webhooks on:" +
  configFile.map(config => '\n + ' +
  'http://localhost:9000/hooks/' + config.id))
