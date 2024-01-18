const Feedback = require('../../models/Feedback');

const getLastComments = async (req, res, next) => {
	const { id } = req.user;

	let feedbacks = await Feedback.find({
		userId: id,
		comment: { $exists: true },
	}).sort({ createdAt: -1 });

	if (feedbacks.length > 5) {
		feedbacks = feedbacks.slice(0, 5);
	}
	return res.status(200).json({ comments: feedbacks });
};

module.exports = getLastComments;
