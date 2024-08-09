module.exports = {
  apps: [
    {
      name: "home automation",
      script: "./build/src/main.js",
      cwd: "./build",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
