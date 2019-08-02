module.exports = {
  parser: 'sugarss',
  exec: true,
  minimize: true,
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 0
    }),
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions']
    }),
    require('cssnano')({
      preset: 'default'
    }),
    require('postcss-extend'),
    require('postcss-nested'),
    require('postcss-mixins')
  ]
};
