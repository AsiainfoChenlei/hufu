'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./sit.env')
module.exports = {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://hufu.feo.test/api/v2"'
  // 下边的地址通过注释和放开注释就可以修改了, 大家不要都新写了
  // BASE_URL: '"http://10.247.67.75:8080/api/v2"'
  // BASE_URL: '"http://hufu.feo.test/api/v2"',
  // BASE_URL: '"http://www.easy-mock.com/mock/5a002586fbbb09615044d276/sunlands/v2"'
  // BASE_URL: '"http://huangzhikai.com:8989/"'
  // BASE_URL: '"http://10.247.67.183:8080/api/v2"'
  //  BASE_URL: '"http://172.16.53.89:8080"'
  // BASE_URL: '"http://tuanzi.6655.la:23456/api/v2"'
  // BASE_URL: '"http://10.75.1.207:8080"'
	SSO_URL: '"http://172.16.116.136:9091/cas/login?service=http://10.247.67.183:8080/api/v2/tokensSso"',
  // BASE_URL: '"http://10.75.1.128:8080/api/v2/"'\
  BASE_URL: '"http://10.247.67.183:8080/api/v2"' //  基拯
  // BASE_URL: '"http://10.247.67.75:8080/api/v2"' //  勤哥
}
