const { createProxyMiddleware }= require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/api/',
        { target: 'https://bookaudit.herokuapp.com/',changeOrigin: true,
            pathRewrite: {
                '^/api/':'' //remove /service/api
            }}
    ));
}