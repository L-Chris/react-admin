const config = {
  base: {},
  build: {
    assetsPublicPath: './',
    baseURL: 'https://nei.netease.com/api/apimock/4258d839dcfa5932ff08e632aac348dd/api',
    routeBasePath: '/react-admin'
  },
  dev: {
    assetsPublicPath: '/static',
    baseURL: '/api',
    routeBasePath: ''
  }
}

export default process.env.NODE_ENV === 'production' ? config.build : config.dev
