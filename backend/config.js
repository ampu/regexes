module.exports = {
  http: {
    port: 5000,
    authorization: {
      name: `admin`,
      pass: `admin`,
    },
    cors: {
      origin: [
        `http://localhost:3000`,
        `https://localhost:3000`,
        `https://ampu.github.io`,
      ],
    },
  },
};
