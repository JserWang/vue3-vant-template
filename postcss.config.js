// eslint-disable-next-line @typescript-eslint/no-var-requires
const px2viewport = require('postcss-px-to-viewport');

// 设计稿宽度
const DESIGN_DRAFT_SIZE = 750;

const commonConfig = {
  unitToConvert: 'px',
  viewportWidth: DESIGN_DRAFT_SIZE,
  unitPrecision: 6,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: true,
  landscape: false,
};

module.exports = {
  plugins: [
    require('autoprefixer'),
    px2viewport({
      ...commonConfig,
      exclude: /(\/|\\)(node_modules)(\/|\\)/,
    }),
    px2viewport({
      ...commonConfig,
      viewportWidth: 375,
      exclude: /^((?!vant).)*$/,
    }),
  ],
};
