'use strict'

const Controller = require("egg").Controller

class MainController extends Controller {
	async login() {
		const username = this.ctx.request.body.username;
		const password = this.ctx.request.body.password;
		const sql = " SELECT username FROM admin_user WHERE username = '" + username + "' AND password = '" + password + "'"
		const res = await this.app.mysql.query(sql);
		if (res.length > 0) {
			const token = this.app.jwt.sign({
				username:username,
				password:password
			}, this.config.jwt.secret)
			console.log(token)
			this.ctx.body = { code:200, data: "登陆成功", token:token }
		} else {
			this.ctx.body = { code:400, data: "登陆失败" }
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
			code:200,
			isSuccess: insertSuccess,
			insertId
		}
	}

	async updateArticle() {
		const tempArticle = this.ctx.request.body;
		const result = await this.app.mysql.update("article", tempArticle);
		const updateSuccess = result.affectedRows === 1;
		this.ctx.body = {
			code:200,
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
		this.ctx.body = { code:200, data: results }
	}

	async deleteArticle(){
		try {
			const id = this.ctx.params.id;
			await this.app.mysql.delete("article", {id:id})
			this.ctx.body = {code: 200, data:"删除成功"}
		} catch (error) {
			this.ctx.body = {code:404, data:'删除失败'}
		}
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
		const sql = 'SELECT type_id, count(1) as num FROM article LEFT JOIN type ON article.type_id = type.id  group by type_id;'
		const result = await this.app.mysql.query(sql);
		this.ctx.body = {code:200, data:result}
	}
}

module.exports = MainController