import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/build-babel-loader';
import { buildCssLoader } from './loaders/build-css-loader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2|\.icon\.svg)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const sassLoader = buildCssLoader(options.isDev);
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  return [
    svgLoader,
    fileLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    sassLoader,
  ];
}
