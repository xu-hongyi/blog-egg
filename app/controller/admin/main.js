'use strict'

const Controller = require("egg").Controller

class MainController extends Controller {

	async checkLogin() {
		const username = this.ctx.request.body.username;
		const password = this.ctx.request.body.password;
		const sql = " SELECT username FROM admin_user WHERE username = '" + username + "' AND password = '" + password + "'"
		const res = await this.app.mysql.query(sql);
		if (res.length > 0) {
			let openId = new Date().getTime();
			this.ctx.session.openId = { 'openId': openId }
			this.ctx.body = { "data": "登陆成功", 'openId': openId }
		} else {
			this.ctx.body = { 'data': "登陆失败" }
		}
	}

	async getTypeInfo() {
		const resType = await this.app.mysql.select("type");
		this.ctx.body = { data: resType }
	}

	async addArticle() {
		const tempArticle = this.ctx.request.body;
		const result = await this.app.mysql.insert('article', tempArticle);
		const insertSuccess = result.affectedRows === 1;
		const insertId = result.insertId;
		this.ctx.body = {
			isSuccess: insertSuccess,
			insertId
		}
	}

	async updateArticle() {
		const tempArticle = this.ctx.request.body;
		const result = await this.app.mysql.update("article", tempArticle);
		const updateSuccess = result.affectedRows === 1;
		this.ctx.body = {
			isSuccess: updateSuccess
		}
	}

	async getArticleList() {
		const sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
				"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
				'article.view_count as view_count,' +
                'type.typename as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
		const results = await this.app.mysql.query(sql);
		console.log(results)
		this.ctx.body = { data: results }
	}

	async deleteArticle(){
		const id = this.ctx.params.id;
		const res = await this.app.mysql.delete("article", {id:id})
		this.ctx.body = {data:res}
	}

	async getArticleById(){
		let id = this.ctx.params.id;
		const sql = 'SELECT article.id as id,'+
		'article.title as title,'+
		'article.introduce as introduce,'+
		'article.article_content as article_content,'+
		"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
		'article.view_count as view_count ,'+
		'type.typename as typeName ,'+
		'type.id as typeId '+
		'FROM article LEFT JOIN type ON article.type_id = type.Id '+
		'WHERE article.id='+id
		const result = await this.app.mysql.query(sql);
		this.ctx.body = {data:result}
	}

	async getTypeCount(){
		const sql = 'SELECT type_id, count(1) FROM article LEFT JOIN type ON article.type_id = type.id  group by type_id;'
		const result = await this.app.mysql.query(sql);
		this.ctx.body = {data:result}
	}
}

module.exports = MainController