export type BuildMode = 'development' | 'production';

export interface BuildPaths {
  html: string;
  src: string;
  build: string;
  entry: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface AliasOption {
  [key: string]: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  project: 'frontend' | 'storybook' | 'jest';
  alias: AliasOption;
}
