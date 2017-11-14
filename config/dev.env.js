var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var stringify = require('core-js/library/fn/json/stringify')

var FIREBASE_PORT = '8081'
var FIREBASE_CONFIG = {
  databaseURL: `ws://127.0.1:${FIREBASE_PORT}`
}

module.exports = merge(prodEnv, {
  FIREBASE_CONFIG: stringify(FIREBASE_CONFIG),
  FIREBASE_PORT,
  NODE_ENV: '"development"'
})
