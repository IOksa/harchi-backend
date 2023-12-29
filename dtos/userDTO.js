class UserDTO {
	constructor(model) {
		this.email = model.email;
		this.username = model.username;
		this.id = model._id;
	}
}

module.exports = UserDTO;
