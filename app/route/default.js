module.exports = app =>{
	const {router, controller} = app;
	router.get("/default", controller.default.home.index)
}