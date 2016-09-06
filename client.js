#!/usr/bin/env node

'use strict';
var argv = require('yargs').argv;

if (! argv.url ){
  console.log('you need a URL parm :  --url=http://foobar')
  return;
}

if (! argv.loopCount ){
  console.log('you need a loopCount parm :  --loopCount=3600    - this would be 1 our of pings')
  return;
}

var restify = require('restify');
var assert = require('assert');

var url =  argv.url;

var client = restify.createJsonClient({
  url: url,
  accept: 'application/json',
  version: '*'
});

var loopCounter = 0;
var loopCount = argv.loopCount;
var looper;

function loopit() {
  if (++loopCounter > loopCount) {
    clearInterval(looper);
  }
  else {
    client.get('/hello/joe', function (err, req, res, data) {
      assert.ifError(err);
      console.log('count: %s: %j', loopCounter, data);
    });
  }

}

looper = setInterval(loopit, 1000);

