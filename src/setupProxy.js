const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(
		[ '/api/users/*', '/auth/google' ],
		createProxyMiddleware({
			// target: 'http://localhost:4001'
			target: 'http://159.203.72.155:4001/'
		})
	);
};
