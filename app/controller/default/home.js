'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    
    ctx.body = 'hello, api接口';
  }

  async getArticleList(){
    let sql = 'SELECT artical.id as id, ' +
              'artical.title as title, ' + 
              'artical.introduce as introduce, ' + 
              'artical.addTime as addTime, ' + 
              'artical.view_count as view_count, ' +
              'type.typename as typeName ' +
              'FROM artical LEFT JOIN type ON artical.type_id = type_id' ;
    const results = await this.app.mysql.query(sql);
    console.log(results)
    this.ctx.body = {data:results}
  } 
}

module.exports = HomeController;
