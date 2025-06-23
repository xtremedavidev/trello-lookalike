const CHUNK_PUBLIC_PATH = "server/app/api/boards/[boardId]/route.js";
const runtime = require("../../../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_d36c8cf4._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__13768811._.js");
runtime.getOrInstantiateRuntimeModule(
  "[project]/.next-internal/server/app/api/boards/[boardId]/route/actions.js [app-rsc] (server actions loader, ecmascript)",
  CHUNK_PUBLIC_PATH,
);
runtime.getOrInstantiateRuntimeModule(
  '[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => "[project]/src/app/api/boards/[boardId]/route.ts [app-route] (ecmascript)" } [app-route] (ecmascript)',
  CHUNK_PUBLIC_PATH,
);
module.exports = runtime.getOrInstantiateRuntimeModule(
  '[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => "[project]/src/app/api/boards/[boardId]/route.ts [app-route] (ecmascript)" } [app-route] (ecmascript)',
  CHUNK_PUBLIC_PATH,
).exports;
