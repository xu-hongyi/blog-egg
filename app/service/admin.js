'use strict';

const Service = require('egg').Service;


class AdminService extends Service{
	async isValidLogin(key, value){
		const data = await this.getUser(value);
		for (const item of data) {
			if(item[key] === value) return true;
		}
		return false;
	}

	async getUser(value){
		const sql = "SELECT * FROM admin_user WHERE username = " + value + " "
		return await this.app.mysql.query(sql);
	}
}


module.exports = AdminService;