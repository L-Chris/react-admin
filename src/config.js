const config = {
  base: {},
  dev: {
    baseURL: '/api',
    assetsPublicPath: '/static',
    routeBasePath: ''
  },
  build: {
    baseURL: 'https://nei.netease.com/api/apimock/4258d839dcfa5932ff08e632aac348dd/api',
    assetsPublicPath: './',
    routeBasePath: '/react-admin'
  }
}

export default process.env.NODE_ENV === 'production' ? config.build : config.dev
