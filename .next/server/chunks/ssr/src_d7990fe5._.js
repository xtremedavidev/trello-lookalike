module.exports = {
  "[project]/src/libs/logger.ts [app-ssr] (ecmascript)": (
    __turbopack_context__,
  ) => {
    "use strict";

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        logger: () => logger,
      });
      const log = (level, message, ...args) => {
        const timestamp = new Date().toISOString();
        console[level](
          `[${timestamp}] [${level.toUpperCase()}] ${message}`,
          ...args,
        );
      };
      const logger = {
        info: (message, ...args) => log("info", message, ...args),
        warn: (message, ...args) => log("warn", message, ...args),
        error: (message, ...args) => log("error", message, ...args),
      };
    }
  },
  "[project]/src/app/error.tsx [app-ssr] (ecmascript)": (
    __turbopack_context__,
  ) => {
    "use strict";

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => Error,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/src/libs/logger.ts [app-ssr] (ecmascript)",
        );
      ("use client");
      function Error({ error, reset }) {
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ])(() => {
          // Log the error to an error reporting service
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "logger"
          ].error("Unhandled error", error);
        }, [error]);
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex flex-col items-center justify-center h-screen",
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "h2",
                {
                  className: "text-2xl font-bold mb-4",
                  children: "Something went wrong!",
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/error.tsx",
                  lineNumber: 20,
                  columnNumber: 7,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "p",
                {
                  className: "mb-4",
                  children: error.message,
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/error.tsx",
                  lineNumber: 21,
                  columnNumber: 7,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "button",
                {
                  // Attempt to recover by trying to re-render the segment
                  onClick: () => reset(),
                  className: "px-4 py-2 bg-blue-500 text-white rounded",
                  children: "Try again",
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/error.tsx",
                  lineNumber: 22,
                  columnNumber: 7,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: "[project]/src/app/error.tsx",
            lineNumber: 19,
            columnNumber: 5,
          },
          this,
        );
      }
    }
  },
};

//# sourceMappingURL=src_d7990fe5._.js.map
