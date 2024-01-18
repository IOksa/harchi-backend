const { Recipe } = require('../../models/recipe');
const Feedback = require('../../models/Feedback');

const getStatistics = async (req, res) => {
	const { _id: user } = req.user;

	const receiptAmount = await Recipe.find({ user_id: user }).length;
	const allScores = await Feedback.find({ user_id: user });
	const averageScore =
		allScores.reduce((accum, el) => {
			accum += el.score;
			return accum;
		}, 0) / allScores.length;
	const comments = allScores.filter((el) => el.comment).length;

	return res.status(200).json({
		receiptAmount: receiptAmount || 0,
		likes: allScores.length,
		comments,
		averageScore: averageScore || 0,
	});
};

module.exports = getStatistics;
