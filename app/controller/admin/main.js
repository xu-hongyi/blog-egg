'use strict'

const Controller = require("egg").Controller

class MainController extends Controller {
	async login() {
		const username = this.ctx.request.body.username;
		const password = this.ctx.request.body.password;
		const res = await this.service.admin.getUser(username, password);
		if (res.length > 0) {
			const token = this.app.jwt.sign({
				username:username,
				password:password
			}, this.config.jwt.secret)
			this.ctx.session.isLogin = true;
			this.ctx.cookies.set("token", token, {
				maxAge:3 * 1000 * 3600 * 24,
				httpOnly:true,
				overwrite:false
			})
			this.ctx.body = { code:200, data: "登陆成功", token }
		} else {
			this.ctx.body = { code:400, data: "登陆失败" }
		}
	}

	async checkLogin(){
		if(this.ctx.session.isLogin){
			this.ctx.body = {code:200, data:true}
		}else{
			this.ctx.body = {code:200, data:false}
		}
	}

	async getTypeInfo() {
		const data = await this.service.page.getTypeInfo()
		this.ctx.body = { code:200, data }
	}

	async addArticle() {
		const tempArticle = this.ctx.request.body;
		const data =  await this.service.admin.addArticle(tempArticle);
		const insertSuccess = data.affectedRows === 1;
		const insertId = data.insertId;
		this.ctx.body = {
			code:200,
			isSuccess: insertSuccess,
			insertId
		}
	}

	async updateArticle() {
		const tempArticle = this.ctx.request.body;
		const result = await this.service.admin.updateArticle(tempArticle);
		const updateSuccess = result.affectedRows === 1;
		this.ctx.body = {
			code:200,
			isSuccess: updateSuccess
		}
	}

	async getArticleList() {
		const data = await this.service.page.getArticleList(0);
		this.ctx.body = { code:200, data }
	}

	async deleteArticle(){
		const id = this.ctx.params.id;
		const data = await this.service.admin.deleteArticle(id);
		if(data.affectedRows === 1){
			this.ctx.body = {code: 200, data:"删除成功"}
		}else{
			this.ctx.body = {code: 200, data:"找不到这篇文章"}
		}
	}

	async getArticleById(){
		let id = this.ctx.params.id;
		const data = await this.service.page.getArticleById(id);
		this.ctx.body = {code:200, data}
	}

	async getTypeCount(){
		const data = await this.service.admin.getTypeCount()
		this.ctx.body = {code:200, data}
	}

	async searchArticle(){
		const params = this.ctx.request.body;
		const data = await this.service.admin.searchArticle(params);
		this.ctx.body = {code:200, data}
	}
}

module.exports = MainController