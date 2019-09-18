'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://47.94.149.236:18306"'
  // API_ROOT:'"http://www.lkvip.com"'
})
