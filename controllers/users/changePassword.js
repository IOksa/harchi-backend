const UserDTO = require('../../dtos/userDTO');
const ApiError = require('../../exceptions/api-error');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res, next) => {
	const { id } = req.user;
	const { currentPassword, newPassword } = req.body;

	if (!currentPassword || !newPassword) {
		return next(ApiError.BadRequest('Current password and new password are required.'));
	}

	const user = await User.findById(id);

	const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

	if (!isPasswordValid) {
		return res.status(401).json({ error: 'Invalid current password.' });
	}
	const hashPassword = await bcrypt.hash(newPassword, 4);
	user.password = hashPassword;
	await user.save();
	return res.status(200).json({ user: new UserDTO(user) });
};

module.exports = changePassword;
