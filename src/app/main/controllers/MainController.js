class MainController {

	index(request, reply) {
		return reply({
			hello: 'NBI Clearance API v2'
		});
	}
}

export default MainController;