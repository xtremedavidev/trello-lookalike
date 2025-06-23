(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "chunks/[root-of-the-server]__dc15d093._.js",
  {
    "[externals]/node:buffer [external] (node:buffer, cjs)": function (
      __turbopack_context__,
    ) {
      var {
        g: global,
        __dirname,
        m: module,
        e: exports,
      } = __turbopack_context__;
      {
        const mod = __turbopack_context__.x("node:buffer", () =>
          require("node:buffer"),
        );

        module.exports = mod;
      }
    },
    "[externals]/node:async_hooks [external] (node:async_hooks, cjs)":
      function (__turbopack_context__) {
        var {
          g: global,
          __dirname,
          m: module,
          e: exports,
        } = __turbopack_context__;
        {
          const mod = __turbopack_context__.x("node:async_hooks", () =>
            require("node:async_hooks"),
          );

          module.exports = mod;
        }
      },
    "[project]/src/middleware.ts [middleware-edge] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.s({
          config: () => config,
          middleware: () => middleware,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
          __turbopack_context__.i(
            "[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)",
          );
        async function middleware(req) {
          const token = req.cookies.get("token")?.value;
          if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "NextResponse"
            ].redirect(new URL("/login", req.url));
          }
          return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].next();
        }
        const config = {
          matcher: [
            /*
             * Match all request paths except for the ones starting with:
             * - api
             * - login
             * - signup
             * - _next/static
             * - _next/image
             * - favicon.ico
             */ "/((?!api|login|signup|_next/static|_next/image|favicon.ico).*)",
          ],
        };
      }
    },
  },
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dc15d093._.js.map
