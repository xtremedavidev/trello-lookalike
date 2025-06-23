(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  typeof document === "object" ? document.currentScript : undefined,
  {
    "[project]/src/libs/api.ts [app-client] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var {
        g: global,
        __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__;
      {
        __turbopack_context__.s({
          api: () => api,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)",
          );
        class BoardHubAPI {
          baseURL;
          constructor(baseURL) {
            this.baseURL = baseURL;
          }
          getToken() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "default"
            ].get("token");
          }
          setToken(token) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "default"
            ].set("token", token, {
              expires: 7,
              path: "/",
            });
          }
          removeToken() {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "default"
            ].remove("token", {
              path: "/",
            });
          }
          async request(endpoint, options = {}) {
            const token = this.getToken();
            const url = `${this.baseURL}${endpoint}`;
            const config = {
              ...options,
              headers: {
                "Content-Type": "application/json",
                ...options.headers,
              },
            };
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(url, config);
            const data = await response.json();
            if (!response.ok) {
              if (response.status === 401) {
                this.removeToken();
                if (("TURBOPACK compile-time truthy", 1)) {
                  window.location.href = "/login";
                }
              }
              throw new Error(data.message || "API request failed");
            }
            return data;
          }
          // Authentication
          async login(email, password) {
            const data = await this.request("/auth/login", {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
            });
            this.setToken(data.data.token);
            return data.data.user;
          }
          async register(name, email, password) {
            const data = await this.request("/auth/register", {
              method: "POST",
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            });
            this.setToken(data.data.token);
            return data.data.user;
          }
          async logout() {
            await this.request("/auth/logout", {
              method: "POST",
            });
            this.removeToken();
          }
          async getMe() {
            const data = await this.request("/auth/me");
            return data.data.user;
          }
          async updateProfile(userData) {
            const data = await this.request("/auth/profile", {
              method: "PUT",
              body: JSON.stringify(userData),
            });
            return data.data.user;
          }
          // Boards
          async getBoards() {
            const data = await this.request("/boards");
            return data.data.boards;
          }
          async createBoard(boardData) {
            const data = await this.request("/boards", {
              method: "POST",
              body: JSON.stringify(boardData),
            });
            return data.data.board;
          }
          async updateBoard(boardId, boardData) {
            const data = await this.request(`/boards/${boardId}`, {
              method: "PUT",
              body: JSON.stringify(boardData),
            });
            return data.data.board;
          }
          async deleteBoard(boardId) {
            await this.request(`/boards/${boardId}`, {
              method: "DELETE",
            });
          }
          // Lists
          async getLists(boardId) {
            const data = await this.request(`/lists/board/${boardId}`);
            return data.data.lists;
          }
          async createList(listData) {
            const data = await this.request("/lists", {
              method: "POST",
              body: JSON.stringify(listData),
            });
            return data.data.list;
          }
          async updateList(listId, listData) {
            const data = await this.request(`/lists/${listId}`, {
              method: "PUT",
              body: JSON.stringify(listData),
            });
            return data.data.list;
          }
          async reorderList(listId, newOrder) {
            return this.request(`/lists/${listId}/reorder`, {
              method: "PUT",
              body: JSON.stringify({
                newOrder,
              }),
            });
          }
          // Cards
          async getCards(listId) {
            const data = await this.request(`/cards/list/${listId}`);
            return data.data.cards;
          }
          async createCard(cardData) {
            const data = await this.request("/cards", {
              method: "POST",
              body: JSON.stringify(cardData),
            });
            return data.data.card;
          }
          async updateCard(cardId, cardData) {
            const data = await this.request(`/cards/${cardId}`, {
              method: "PUT",
              body: JSON.stringify(cardData),
            });
            return data.data.card;
          }
          async deleteCard(cardId) {
            await this.request(`/cards/${cardId}`, {
              method: "DELETE",
            });
          }
          async moveCard(cardId, newListId, newOrder) {
            const data = await this.request(`/cards/${cardId}/move`, {
              method: "PUT",
              body: JSON.stringify({
                newListId,
                newOrder,
              }),
            });
            return data.data.card;
          }
        }
        const api = new BoardHubAPI(
          "https://boardhub-backend.onrender.com/api",
        );
        if (
          typeof globalThis.$RefreshHelpers$ === "object" &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$,
          );
        }
      }
    },
    "[project]/src/app/login/page.tsx [app-client] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var {
        g: global,
        __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__;
      {
        __turbopack_context__.s({
          default: () => LoginPage,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/next/navigation.js [app-client] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/src/libs/api.ts [app-client] (ecmascript)",
          );
        var _s = __turbopack_context__.k.signature();
        ("use client");
        function LoginPage() {
          _s();
          const [email, setEmail] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "useState"
          ])("");
          const [password, setPassword] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "useState"
          ])("");
          const [error, setError] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "useState"
          ])(null);
          const router = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "useRouter"
          ])();
          const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            try {
              await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "api"
              ].login(email, password);
              router.push("/");
            } catch (err) {
              setError(err.message || "Login failed");
            }
          };
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className: "flex justify-center items-center h-screen",
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "p-8 border rounded-lg shadow-lg w-96",
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "h1",
                      {
                        className: "text-2xl font-bold mb-6",
                        children: "Login",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    error &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4",
                          role: "alert",
                          children: error,
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/login/page.tsx",
                          lineNumber: 28,
                          columnNumber: 19,
                        },
                        this,
                      ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "mb-4",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "label",
                            {
                              className: "block mb-1",
                              children: "Email",
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 30,
                              columnNumber: 11,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "input",
                            {
                              type: "email",
                              value: email,
                              onChange: (e) => setEmail(e.target.value),
                              className: "w-full p-2 border rounded",
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 31,
                              columnNumber: 11,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "mb-6",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "label",
                            {
                              className: "block mb-1",
                              children: "Password",
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 39,
                              columnNumber: 11,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "input",
                            {
                              type: "password",
                              value: password,
                              onChange: (e) => setPassword(e.target.value),
                              className: "w-full p-2 border rounded",
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/login/page.tsx",
                              lineNumber: 40,
                              columnNumber: 11,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "button",
                      {
                        type: "submit",
                        className: "w-full bg-blue-500 text-white p-2 rounded",
                        children: "Login",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/login/page.tsx",
                  lineNumber: 26,
                  columnNumber: 7,
                },
                this,
              ),
            },
            void 0,
            false,
            {
              fileName: "[project]/src/app/login/page.tsx",
              lineNumber: 25,
              columnNumber: 5,
            },
            this,
          );
        }
        _s(LoginPage, "KDcrWWm7Ok4/roycPHtGpaeNLNs=", false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "useRouter"
            ],
          ];
        });
        _c = LoginPage;
        var _c;
        __turbopack_context__.k.register(_c, "LoginPage");
        if (
          typeof globalThis.$RefreshHelpers$ === "object" &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$,
          );
        }
      }
    },
    "[project]/node_modules/next/navigation.js [app-client] (ecmascript)":
      function (__turbopack_context__) {
        var {
          g: global,
          __dirname,
          m: module,
          e: exports,
        } = __turbopack_context__;
        {
          module.exports = __turbopack_context__.r(
            "[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)",
          );
        }
      },
    "[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)":
      (__turbopack_context__) => {
        "use strict";

        var { g: global, __dirname } = __turbopack_context__;
        {
          /*! js-cookie v3.0.5 | MIT */ /* eslint-disable no-var */ __turbopack_context__.s(
            {
              default: () => api,
            },
          );
          function assign(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                target[key] = source[key];
              }
            }
            return target;
          }
          /* eslint-enable no-var */ /* eslint-disable no-var */ var defaultConverter =
            {
              read: function (value) {
                if (value[0] === '"') {
                  value = value.slice(1, -1);
                }
                return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
              },
              write: function (value) {
                return encodeURIComponent(value).replace(
                  /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                  decodeURIComponent,
                );
              },
            };
          /* eslint-enable no-var */ /* eslint-disable no-var */ function init(
            converter,
            defaultAttributes,
          ) {
            function set(name, value, attributes) {
              if (typeof document === "undefined") {
                return;
              }
              attributes = assign({}, defaultAttributes, attributes);
              if (typeof attributes.expires === "number") {
                attributes.expires = new Date(
                  Date.now() + attributes.expires * 864e5,
                );
              }
              if (attributes.expires) {
                attributes.expires = attributes.expires.toUTCString();
              }
              name = encodeURIComponent(name)
                .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                .replace(/[()]/g, escape);
              var stringifiedAttributes = "";
              for (var attributeName in attributes) {
                if (!attributes[attributeName]) {
                  continue;
                }
                stringifiedAttributes += "; " + attributeName;
                if (attributes[attributeName] === true) {
                  continue;
                }
                // Considers RFC 6265 section 5.2:
                // ...
                // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                //     character:
                // Consume the characters of the unparsed-attributes up to,
                // not including, the first %x3B (";") character.
                // ...
                stringifiedAttributes +=
                  "=" + attributes[attributeName].split(";")[0];
              }
              return (document.cookie =
                name +
                "=" +
                converter.write(value, name) +
                stringifiedAttributes);
            }
            function get(name) {
              if (
                typeof document === "undefined" ||
                (arguments.length && !name)
              ) {
                return;
              }
              // To prevent the for loop in the first place assign an empty array
              // in case there are no cookies at all.
              var cookies = document.cookie ? document.cookie.split("; ") : [];
              var jar = {};
              for (var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split("=");
                var value = parts.slice(1).join("=");
                try {
                  var found = decodeURIComponent(parts[0]);
                  jar[found] = converter.read(value, found);
                  if (name === found) {
                    break;
                  }
                } catch (e) {}
              }
              return name ? jar[name] : jar;
            }
            return Object.create(
              {
                set,
                get,
                remove: function (name, attributes) {
                  set(
                    name,
                    "",
                    assign({}, attributes, {
                      expires: -1,
                    }),
                  );
                },
                withAttributes: function (attributes) {
                  return init(
                    this.converter,
                    assign({}, this.attributes, attributes),
                  );
                },
                withConverter: function (converter) {
                  return init(
                    assign({}, this.converter, converter),
                    this.attributes,
                  );
                },
              },
              {
                attributes: {
                  value: Object.freeze(defaultAttributes),
                },
                converter: {
                  value: Object.freeze(converter),
                },
              },
            );
          }
          var api = init(defaultConverter, {
            path: "/",
          });
        }
      },
  },
]);

//# sourceMappingURL=_4879b734._.js.map
