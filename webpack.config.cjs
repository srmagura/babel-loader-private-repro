const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "src/App.ts"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "."), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
