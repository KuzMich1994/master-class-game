import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/build-webpack-config';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import alias from './config/build/alias/alias';

export default (env: BuildEnv): webpack.Configuration => {
  const paths: BuildPaths = {
    build: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const MODE = env.mode || 'development';
  const PORT = env.port || 3000;
  const isDev = MODE === 'development';
  const { apiUrl } = env;

  return buildWebpackConfig({
    mode: MODE,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: 'frontend',
    alias,
  });
};
