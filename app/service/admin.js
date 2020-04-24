'use strict'

const Service = require('egg').Service;

class AdminService extends Service{
	async getUser(username, password){
		const sql = " SELECT username FROM admin_user WHERE username = '" + username + "' AND password = '" + password + "'"
		const res = await this.app.mysql.query(sql);
		return res;
	}

	async addArticle(tempArticle){
		const result = await this.app.mysql.insert('article', tempArticle);
		return result
	}

	async updateArticle(tempArticle){
		const result = await this.app.mysql.update("article", tempArticle);
		return result;
	}

	async deleteArticle(id){
		const result = await this.app.mysql.delete("article", {id:id})
		return result
	}
	
	async getTypeCount(){
		const sql = 'SELECT type_id, type.typename as typename, count(1) as num FROM article LEFT JOIN type ON article.type_id = type.id  group by type_id;'
		const result = await this.app.mysql.query(sql);
		return result;
	}

	async searchArticle({key, page = 0, limit = 5}){
		const p = parseInt(page) * parseInt(limit);
		const sql = "SELECT * FROM article WHERE CONCAT(title, article_content,introduce) LIKE CONCAT('%', '"+ key +"' ,'%')  LIMIT "+ p +","+ limit;
		const result = await this.app.mysql.query(sql);
		return result;
	}
}

module.exports = AdminService;