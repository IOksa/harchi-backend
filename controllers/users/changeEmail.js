const UserDTO = require('../../dtos/userDTO');
const User = require('../../models/User');

const changeEmail = async (req, res) => {
	const { id } = req.user;
	const { email } = req.body;
	const user = await User.findByIdAndUpdate(id, { email }, { new: true });

	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = changeEmail;
