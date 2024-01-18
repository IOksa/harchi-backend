const UserDTO = require('../../dtos/userDTO');
const User = require('../../models/User');

const removeAvatar = async (req, res) => {
	const { id } = req.user;

	const user = await User.findByIdAndUpdate(id, { avatar: null }, { new: true });

	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = removeAvatar;
