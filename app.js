#!/usr/bin/env node

var express = require('express');
var app = express();
var path = require("path");
var configPath = path.join(process.cwd(), process.argv[
  process.argv.indexOf('--config') + 1])
var configFile = require(configPath);

configFile.forEach(function(config) {
  app.get('/hooks/' + config.id, function(req, res) {
    console.log("Received webhook:", config.id)
    exec(config.exec, (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  })
});

app.listen(9909);
console.log("Listening for webhooks on:\n" +
  configFile.map(config => ' + ' +
  'http://localhost:9000/hooks/' + config.id).join('\n'))
