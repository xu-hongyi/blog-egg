'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList(){
    let sql = 'SELECT article.id as id, ' +
              'article.title as title, ' + 
              'article.introduce as introduce, ' + 
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " + 
              'article.view_count as view_count, ' +
              'type.typename as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type_id' ;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {data:results}
  } 

  async getArticleById(){
    const id = ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
    'article.title as title, ' + 
    'article.article_content as article_content, ' + 
    "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " + 
    'article.view_count as view_count, ' +
    'type.typename as typeName, ' +
    'type.id as typeId'
    'FROM article LEFT JOIN type ON article.type_id = type_id' + 
     'WHERE article.id =' + id;
     const result = await this.app.mysql.query(sql);
     this.ctx.body = {data:result}
  }
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  
}

module.exports = HomeController;
