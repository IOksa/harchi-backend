const User = require('../../models/User');

const removeAccount = async (req, res) => {
	const { id } = req.user;

	await User.findByIdAndDelete(id);

	return res.status(200).json({ status: 'Ok' });
};

module.exports = removeAccount;
