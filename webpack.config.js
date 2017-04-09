const webpack = require("webpack");
const path = require("path")
const BabiliPlugin = require("babili-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function requireDefault(module, value) {
    try {
      return require(module);
    } catch(e) {
    }
    return value;
}

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },

    resolve: {
        extensions: [".scss", ".js", ".ts", ".tsx"]
    },

    module: {
        loaders: [
            { test: /\.png$/, loaders: ["url-loader"] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.tsx?$/, loaders: ["ts-loader"] }
        ]
    },

    externals: {
        config: JSON.stringify(requireDefault("./config.json", {}))
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.ProvidePlugin({
            config: "config",
            jQuery: "jquery",
            "window.Tether": "tether"
        }),
        new BabiliPlugin({
            comments: false
        }),
        new FaviconsWebpackPlugin({
            logo: "./src/images/transmission.png",
            prefix: "icons/",
            title: "Transmission",
            icons: {
              firefox: false
            }
        }),
        new HtmlWebpackPlugin({
            title: "Transmission",
            template: "./src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        })
    ]
};
