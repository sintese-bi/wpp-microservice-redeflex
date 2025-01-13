module.exports = {
  apps: [
    {
      name: "wpp",
      script: "dist/app.js",
      watch: true,
      ignore_watch: ["node_modules", "src", "logs", ".wwebjs_auth"],
      error_file: "./logs/err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      mode: "fork",
      instances: 1,
      autorestart: true,
      max_restarts: 1,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
