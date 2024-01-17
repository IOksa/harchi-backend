class UserDTO {
	constructor(model) {
		this.email = model.email;
		this.username = model.username;
		this.id = model._id;
		this.slogan = model.slogan;
		this.avatar = model.avatar;
	}
}

module.exports = UserDTO;
