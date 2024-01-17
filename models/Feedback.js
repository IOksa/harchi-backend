const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
	{
		receiptId: { type: Schema.Types.ObjectId, ref: 'Receipt', required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		score: { type: Number, required: true },
		comment: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
