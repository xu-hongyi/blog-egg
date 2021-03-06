module.exports = app =>{
	const {router, controller, jwt} = app;
	router.post("/admin/login", controller.admin.main.login)
	router.get("/admin/checkLogin", controller.admin.main.checkLogin)
	router.get("/admin/getTypeInfo",jwt, controller.admin.main.getTypeInfo)//
	router.post("/admin/addArticle", jwt, controller.admin.main.addArticle)
	router.post("/admin/updateArticle", jwt, controller.admin.main.updateArticle)
	router.get("/admin/getArticleList", jwt, controller.admin.main.getArticleList)
	router.get("/admin/deleteArticle/:id", jwt, controller.admin.main.deleteArticle)
	router.get("/admin/getArticleById/:id", jwt, controller.admin.main.getArticleById)
	router.get("/admin/getTypeCount", jwt, controller.admin.main.getTypeCount)
	router.post("/admin/searchArticle", jwt, controller.admin.main.searchArticle)
}