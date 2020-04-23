/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587454539952_8198';

  // add your middleware config here
  config.middleware = [];
  config.jwt = {
    secret:"123456",
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
    
      user: 'root',
      // password
      password: 'Xu123456',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf:{
      enable:false
    },
    domainWhiteList:['http://localhost:3000']
  };
  config.cors = {
    origin:"http://localhost:3000",
    credentials:true, //允许cookie跨域
    allowMethods:"GET,HEAD,PUT,POST,DELETE,OPTIONS"
  }
  return {
    ...config,
    ...userConfig,
  };
};
