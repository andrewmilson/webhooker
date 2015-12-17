#!/usr/bin/env node

var express = require('express');
var app = express();
var exec = require('child_process');

var portIndex = process.argv.indexOf('--port')
var port = ~portIndex ? process.argv[portIndex + 1] : 9000;

var path = require("path");
var configPath = path.join(process.cwd(), process.argv[
  process.argv.indexOf('--config') + 1]);
var configDir = path.dirname(configPath);
var configFile = require(configPath);

configFile.forEach(function(config) {
  app.post('/hooks/' + config.id, function(req, res) {
    console.log("Received webhook:", config.id)
    exec.exec(config.cmd, [], {cwd: configDir},
    function(err, stdout, stderr) {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  })
});

app.listen(port);
console.log("Listening for webhooks on:\n" +
  configFile.map(config => ' + ' +
  'http://localhost:' + port + '/hooks/' + config.id).join('\n'))
