const CHUNK_PUBLIC_PATH = "server/app/api/auth/login/route.js";
const runtime = require("../../../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_eb7376a5._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__a557c7de._.js");
runtime.getOrInstantiateRuntimeModule(
  "[project]/.next-internal/server/app/api/auth/login/route/actions.js [app-rsc] (server actions loader, ecmascript)",
  CHUNK_PUBLIC_PATH,
);
runtime.getOrInstantiateRuntimeModule(
  '[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => "[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)" } [app-route] (ecmascript)',
  CHUNK_PUBLIC_PATH,
);
module.exports = runtime.getOrInstantiateRuntimeModule(
  '[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => "[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)" } [app-route] (ecmascript)',
  CHUNK_PUBLIC_PATH,
).exports;
