const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenSchema = new Schema({
	refreshToken: { type: String, required: true },
	user: { type: String, required: true },
});

module.exports = mongoose.model('Token', TokenSchema);
