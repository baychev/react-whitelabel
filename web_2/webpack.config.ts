const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const deps = require('./package.json').dependencies;

type EnvArgs = { brand: string, production: boolean}

module.exports = (env: EnvArgs) => {
  console.log('env file:', `.env${env.brand ? '.' + env.brand : ''}${!env.production ? '.development' : ''}`) 

  return {
    mode: env.production ? "production" : "development",
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|ico|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      publicPath: 'auto',
      clean: true,
    },
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new Dotenv({
        path: `.env${env.brand ? '.' + env.brand : ''}${!env.production ? '.development' : ''}`
      }),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/*/,
        function (resource: any) {
          if (env.brand?.length > 0 && !resource.request.endsWith(`.${env.brand}`)) {
            var branded_file = resource.request + `.${env.brand}`;
            ['ts', 'tsx'].forEach(ext => {
              if (fs.existsSync(path.resolve(resource.context, `${branded_file}.${ext}`))) {
                console.warn('FILE REPLACEMENT:', resource.request, branded_file)
                resource.request = branded_file;
              }
            })
          }
        }
      ),
      new webpack.container.ModuleFederationPlugin({
        name: 'web2',
        filename: 'remote.js',
        exposes: {
          './Component1': './src/components/Component1',
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
        },
      })
    ],
  }
}