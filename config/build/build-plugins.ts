import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({
  paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const isProd = !isDev;

  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.html,
      favicon: './src/shared/assets/icons/favicon.svg',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ];

  if (isDev) {
    console.log('true');
    
    plugins.push(new ReactRefreshPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }));
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }));
  }

  return plugins;
}