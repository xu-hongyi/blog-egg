module.exports = app =>{
	const {router, controller} = app;
	const adminauth = app.middleware.adminauth();
	router.post("/admin/checkLogin", controller.admin.main.checkLogin)
	router.get("/admin/getTypeInfo",adminauth, controller.admin.main.getTypeInfo)//
	router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle)
	router.post("/admin/updateArticle", adminauth, controller.admin.main.updateArticle)
	router.get("/admin/getArticleList", adminauth, controller.admin.main.getArticleList)
	router.get("/admin/deleteArticle/:id", adminauth, controller.admin.main.deleteArticle)
	router.get("/admin/getArticleById/:id", adminauth, controller.admin.main.getArticleById)
	router.get("/admin/getTypeCount", adminauth, controller.admin.main.getTypeCount)
}