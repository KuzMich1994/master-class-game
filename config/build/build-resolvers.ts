import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  const alias = {
    '@': options.paths.src,
    ...options.alias,
  };

  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    alias,
    mainFiles: ['index'],
  };
}
