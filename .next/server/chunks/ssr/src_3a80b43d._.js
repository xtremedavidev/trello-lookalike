module.exports = {
  "[project]/src/components/dnd/Card.tsx [app-ssr] (ecmascript)": (
    __turbopack_context__,
  ) => {
    "use strict";

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        Card: () => Card,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)",
        );
      ("use client");
      function Card({ card }) {
        const { attributes, listeners, setNodeRef, transform, transition } = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useSortable"
        ])({
          id: card._id,
          data: {
            type: "Card",
          },
        });
        const style = {
          transform:
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "CSS"
            ].Transform.toString(transform),
          transition,
        };
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            ref: setNodeRef,
            style: style,
            ...attributes,
            ...listeners,
            className: "bg-white p-2 rounded-md shadow-sm",
            children: card.name,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/dnd/Card.tsx",
            lineNumber: 27,
            columnNumber: 5,
          },
          this,
        );
      }
    }
  },
  "[project]/src/components/dnd/List.tsx [app-ssr] (ecmascript)": (
    __turbopack_context__,
  ) => {
    "use strict";

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        List: () => List,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dnd$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/src/components/dnd/Card.tsx [app-ssr] (ecmascript)",
        );
      ("use client");
      function List({ list, cards }) {
        const { attributes, listeners, setNodeRef, transform, transition } = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useSortable"
        ])({
          id: list._id,
          data: {
            type: "List",
          },
        });
        const style = {
          transform:
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "CSS"
            ].Transform.toString(transform),
          transition,
        };
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            ref: setNodeRef,
            style: style,
            ...attributes,
            ...listeners,
            className: "bg-gray-200 p-4 rounded-md w-72",
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "h2",
                {
                  className: "font-bold mb-2",
                  children: list.name,
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/components/dnd/List.tsx",
                  lineNumber: 30,
                  columnNumber: 7,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "SortableContext"
                ],
                {
                  items: cards.map((c) => c._id),
                  strategy:
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "verticalListSortingStrategy"
                    ],
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "space-y-2",
                      children: cards.map((card) =>
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dnd$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "Card"
                          ],
                          {
                            card: card,
                          },
                          card._id,
                          false,
                          {
                            fileName: "[project]/src/components/dnd/List.tsx",
                            lineNumber: 34,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/components/dnd/List.tsx",
                      lineNumber: 32,
                      columnNumber: 9,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/components/dnd/List.tsx",
                  lineNumber: 31,
                  columnNumber: 7,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: "[project]/src/components/dnd/List.tsx",
            lineNumber: 29,
            columnNumber: 5,
          },
          this,
        );
      }
    }
  },
  "[project]/src/app/page.tsx [app-ssr] (ecmascript)": (
    __turbopack_context__,
  ) => {
    "use strict";

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => Home,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)",
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dnd$2f$List$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          "[project]/src/components/dnd/List.tsx [app-ssr] (ecmascript)",
        );
      ("use client");
      function Home() {
        const [board, setBoard] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ])(null);
        const [lists, setLists] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ])([]);
        const [cards, setCards] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useState"
        ])([]);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "useEffect"
        ])(() => {
          // TODO: Replace with a dynamic way to get the board ID
          const boardId = "66779308182b02234a532382"; // IMPORTANT: Replace with a valid board ID from your DB
          if (("TURBOPACK compile-time truthy", 1)) {
            fetch(`/api/boards/${boardId}`)
              .then((res) => res.json())
              .then((data) => {
                setBoard(data.board);
                setLists(data.lists);
                setCards(data.cards);
              });
          }
        }, []);
        const handleDragEnd = (event) => {
          const { active, over } = event;
          if (!over) return;
          if (active.id !== over.id) {
            // Dragging lists
            if (
              active.data.current?.type === "List" &&
              over.data.current?.type === "List"
            ) {
              setLists((lists) => {
                const activeIndex = lists.findIndex((l) => l._id === active.id);
                const overIndex = lists.findIndex((l) => l._id === over.id);
                if (activeIndex === -1 || overIndex === -1) return lists;
                const newLists = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "arrayMove"
                ])(lists, activeIndex, overIndex);
                // API call to update list position
                newLists.forEach((list, index) => {
                  fetch(`/api/lists/${list._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      position: index,
                    }),
                  });
                });
                return newLists;
              });
              return;
            }
            // Dragging cards
            if (active.data.current?.type === "Card") {
              setCards((currentCards) => {
                const activeIndex = currentCards.findIndex(
                  (c) => c._id === active.id,
                );
                const overIndex = currentCards.findIndex(
                  (c) => c._id === over.id,
                );
                if (activeIndex === -1 || overIndex === -1) {
                  return currentCards;
                }
                let newCards = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "arrayMove"
                ])(currentCards, activeIndex, overIndex);
                const overListId =
                  over.data.current?.sortable?.containerId ||
                  newCards[overIndex].list;
                if (overListId && newCards[activeIndex].list !== overListId) {
                  newCards[activeIndex] = {
                    ...newCards[activeIndex],
                    list: overListId,
                  };
                  newCards = (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "arrayMove"
                  ])(newCards, activeIndex, overIndex);
                }
                // API call to update card position and list
                fetch(`/api/cards/${active.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    position: overIndex,
                    list: overListId,
                  }),
                });
                return newCards;
              });
            }
          }
        };
        if (!board) {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className: "flex justify-center items-center h-screen",
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "p",
                {
                  children: [
                    "Please update the boardId in ",
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "code",
                      {
                        children: "src/app/page.tsx",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 94,
                        columnNumber: 45,
                      },
                      this,
                    ),
                    " with an ID from your database.",
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/page.tsx",
                  lineNumber: 94,
                  columnNumber: 13,
                },
                this,
              ),
            },
            void 0,
            false,
            {
              fileName: "[project]/src/app/page.tsx",
              lineNumber: 93,
              columnNumber: 9,
            },
            this,
          );
        }
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "DndContext"
          ],
          {
            onDragEnd: handleDragEnd,
            collisionDetection:
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "closestCorners"
              ],
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "p-4",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h1",
                    {
                      className: "text-2xl font-bold mb-4",
                      children: board.name,
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/page.tsx",
                      lineNumber: 102,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "SortableContext"
                    ],
                    {
                      items: lists.map((l) => l._id),
                      strategy:
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "horizontalListSortingStrategy"
                        ],
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex gap-4",
                          children:
                            lists.length > 0
                              ? lists.map((list) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dnd$2f$List$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "List"
                                    ],
                                    {
                                      list: list,
                                      cards: cards.filter(
                                        (c) => c.list === list._id,
                                      ),
                                    },
                                    list._id,
                                    false,
                                    {
                                      fileName: "[project]/src/app/page.tsx",
                                      lineNumber: 107,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                )
                              : /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "flex flex-col items-center justify-center h-full w-full",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-gray-500",
                                        children:
                                          "No lists yet. Create one to get started!",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/page.tsx",
                          lineNumber: 104,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/page.tsx",
                      lineNumber: 103,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 101,
                columnNumber: 7,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 100,
            columnNumber: 5,
          },
          this,
        );
      }
    }
  },
};

//# sourceMappingURL=src_3a80b43d._.js.map
