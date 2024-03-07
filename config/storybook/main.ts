import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, RuleSetRule, DefinePlugin } from 'webpack';
import path from 'path';
import alias from '../build/alias/alias';
import { buildCssLoader } from '../build/loaders/build-css-loader';

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  core: {
    builder: '@storybook/builder-webpack5',
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (webpackConfig: Configuration) => {
    const paths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
    };
    webpackConfig.resolve?.modules?.push(paths.src);
    webpackConfig.resolve?.extensions?.push('.ts', '.tsx');
    webpackConfig.resolve!.alias = {
      ...webpackConfig.resolve?.alias,
      '@': paths.src,
      ...alias,
    };
    // @ts-ignore
    webpackConfig.module!.rules = webpackConfig.module!.rules?.map((rule: RuleSetRule | '...') => {
      if (rule !== '...' && /svg/.test(rule.test as string)) {
        return {
          ...rule,
          exclude: /\.svg/i,
        };
      }

      return rule;
    });

    webpackConfig.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    webpackConfig.module?.rules?.push(buildCssLoader(true));

    webpackConfig.plugins?.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('SERVER URL'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );

    return webpackConfig;
  },
};
export default config;
