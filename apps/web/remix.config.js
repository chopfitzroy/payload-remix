/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  assetsBuildDirectory: 'public/web/build',
  publicPath: '/web/build/',
  serverDependenciesToBundle: ['@org/ui'],
  watchPaths: ['../../packages/ui', '../../packages/shared'],
  future: {
    v2_routeConvention: true,
  },
};
