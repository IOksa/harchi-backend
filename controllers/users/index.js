const { ctrlWrapper } = require('../../helpers');
const changePassword = require('./changePassword');
const getStatistics = require('./getStatistics');
const changeEmail = require('./changeEmail');
const changeUsername = require('./changeUsername');
const changeSlogan = require('./changeSlogan');
const addAvatar = require('./addAvatar');
const removeAvatar = require('./removeAvatar');
const getLastComments = require('./getLastComments');
const removeAccount = require('./removeAccount');

module.exports = {
	getStatistics: ctrlWrapper(getStatistics),
	getLastComments: ctrlWrapper(getLastComments),
	changePassword: ctrlWrapper(changePassword),
	changeEmail: ctrlWrapper(changeEmail),
	changeUsername: ctrlWrapper(changeUsername),
	changeSlogan: ctrlWrapper(changeSlogan),
	addAvatar: ctrlWrapper(addAvatar),
	removeAvatar: ctrlWrapper(removeAvatar),
	removeAccount: ctrlWrapper(removeAccount),
};
