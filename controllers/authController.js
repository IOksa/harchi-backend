const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const dayjs = require('dayjs');
const { REFRESH_TOKEN } = require('../constants');

class AuthController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()));
			}
			const { email, username, password } = req.body;
			const userData = await userService.registration(email, username, password);
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				expires: dayjs().add(30, 'days').toDate(),
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
			res.status(400).json(err);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				expires: dayjs().add(30, 'days').toDate(),
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			window.localStorage.removeItem('token');
			return res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: false,
			});

			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}
module.exports = new AuthController();
