/** @type {import('@remix-run/dev').AppConfig} */
export default {  future: {
    v2_meta: true,
    v2_headers: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
  },
  publicPath: '/web/build/',
  watchPaths: ['../../packages/ui', '../../packages/shared'],
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: "esm",
  assetsBuildDirectory: 'public/web/build',
  serverDependenciesToBundle: ['ui'],
};
