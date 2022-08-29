const path = require("path");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/App.tsx"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "."), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
