import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './build-plugins';
import { buildResolvers } from './build-resolvers';
import { buildLoaders } from './build-loaders';
import { buildDevServer } from './build-dev-server';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    cache: isDev,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
