const UserDTO = require('../../dtos/userDTO');
const User = require('../../models/User');

const changeSlogan = async (req, res, next) => {
	const { id } = req.user;
	const { slogan } = req.body;
	const user = await User.findByIdAndUpdate(id, { slogan }, { new: true });

	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = changeSlogan;
