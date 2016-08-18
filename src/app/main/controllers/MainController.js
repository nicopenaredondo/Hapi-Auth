class MainController {

	index(request, reply) {
		return reply({
			hello: 'lol'
		});
	}
}

export default MainController;