const UserDTO = require('../../dtos/userDTO');
const User = require('../../models/User');

const addAvatar = async (req, res) => {
	const { id } = req.user;
	const { avatar } = req.body;
	const user = await User.findByIdAndUpdate(id, { avatar }, { new: true });

	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = addAvatar;
