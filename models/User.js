const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String, required: false },
	slogan: { type: String, required: false },

	
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('User', UserSchema);
