const { createProxyMiddleware } = require("http-proxy-middleware");

// Configure a proxy middleware for API requests
module.exports = function (app) {
  app.use(
    "/api", // Proxy requests starting with /api
    createProxyMiddleware({
      target: "http://localhost:3000", // Backend server URL
      changeOrigin: true, // Modify the origin header to match the target
      pathRewrite: {
        "^/api": "", // Remove /api prefix before forwarding the request
      },
    })
  );
};
