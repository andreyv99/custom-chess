module.exports = {
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json"],
    fallback: {
      fs: false,
      readline: false,
      path: false,
      crypto: false,
    },
  },
  target: "web",
};
