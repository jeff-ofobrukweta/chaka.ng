const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                algorithm: "gzip"
            })
            // new BundleAnalyzerPlugin()
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    },
                    extractComments: false
                }),
                new UglifyJsPlugin({
                    parallel: true,
                    cache: true
                })
            ],
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    defaultVendors: {
                        reuseExistingChunk: true
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.vendor-${packageName.replace("@", "")}`;
                        }
                    }, // common chunk
                    common: {
                        name: "common-chunks",
                        maxSize: 1024,
                        chunks: "async",
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        }
    },
    lintOnSave: process.env.NODE_ENV !== "production",
    css: {
        loaderOptions: {
            sass: {
                prependData: `
          @import "@/assets/scss/base/_variables.scss";
          @import "@/assets/scss/base/_mixins.scss";
        `
            }
        }
    },
    transpileDependencies: ["vuex-persist"]
};
