'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList(){
    const page = this.ctx.request.query.page;
    console.log(this.ctx.request.query)
    const data = await this.service.page.getArticleList(page)
    this.ctx.body = {code:200, data}
  } 

  async getArticleById(){
		let id = this.ctx.params.id;
    const data = await this.service.page.getArticleById(id);
		this.ctx.body = {code:200, data}
	}
  async getTypeInfo(){
    const data = await this.service.page.getTypeInfo();
    this.ctx.body = {code:200, data}
  }
  
  async getListById(){
    const id = this.ctx.params.id;
    const page = this.ctx.request.query.page;
    const data = await this.service.page.getListById(id, page);
    this.ctx.body = {code:200, data}
  }

  async searchArticle(){
    const key = this.ctx.request.body.key;
    const data = await this.service.admin.searchArticle(key);
    this.ctx.body = {code:200, data}
  }
}

module.exports = HomeController;
