const UserDTO = require('../../dtos/userDTO');
const User = require('../../models/User');

const changeUsername = async (req, res, next) => {
	const { id } = req.user;
	const { username } = req.body;
	const user = await User.findByIdAndUpdate(id, { username }, { new: true });

	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = changeUsername;
