module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@routes': './src/shared/infra/http/routes',
          '@modules': './src/modules',
          '@middlewares': './src/shared/infra/http/middlewares',
          '@config': './src/config',
          '@shared': './src/shared',
          '@errors': './src/shared/errors',
          '@utils': './src/utils',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
