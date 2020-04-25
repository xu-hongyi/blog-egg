module.exports = app =>{
	const {router, controller} = app;
	router.get("/default/getArticleList", controller.default.home.getArticleList)
	router.get("/default/getArticleById/:id", controller.default.home.getArticleById)	
	router.get("/default/getTypeInfo", controller.default.home.getTypeInfo)	
	router.get("/default/getListById/:id", controller.default.home.getListById)	
	router.post("/default/searchArticle", controller.default.home.searchArticle)
	router.get("/default/getTypeCount", controller.default.home.getTypeCount)	
}