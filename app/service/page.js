'use strict'

const Service = require('egg').Service;

class HomeService extends Service{
	async getArticleList(page, limit = 5){
		const p = parseInt(page) * parseInt(limit);
		let sql = 'SELECT article.id as id, ' +
              'article.title as title, ' + 
              'article.introduce as introduce, ' + 
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, " + 
              'article.view_count as view_count, ' +
              'type.typename as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ORDER BY article.id DESC LIMIT '+ p +','+limit;
		const results = await this.app.mysql.query(sql);
		return results;	
	}

	async getArticleById(id){
		const sql = 'SELECT article.id as id,'+
		'article.title as title,'+
		'article.introduce as introduce,'+
		'article.article_content as article_content,'+
		"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
		'article.view_count as view_count ,'+
		'type.typename as typeName ,'+
		'type.id as typeId '+
		'FROM article LEFT JOIN type ON article.type_id = type.Id '+
		'WHERE article.id='+id;
		await this.service.page.addViewCount(id);
		const result = await this.app.mysql.query(sql);
		return result;
	}

	async getTypeInfo(){
		const result = await this.app.mysql.select('type')
		return result;
	}

	async getListById(id, page, limit = 5){
		const p = parseInt(page) * parseInt(limit);
		let sql = 'SELECT article.id as id, ' +
              'article.title as title, ' + 
              'article.introduce as introduce, ' + 
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d') as addTime, " + 
              'article.view_count as view_count, ' +
              'type.typename as typeName ' +
			  'FROM article LEFT JOIN type ON article.type_id = type.id ' +
			  'WHERE article.type_id=' + id +' ORDER BY article.id DESC LIMIT '+ p +',' + limit;
		const result = await this.app.mysql.query(sql);
		return result;
	}

	async addViewCount(id){
		const sql = "UPDATE article SET article.view_count=article.view_count + 1 WHERE id=" + id;
		await this.app.mysql.query(sql);
	}
}

module.exports = HomeService;