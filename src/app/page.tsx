"use client";
import React from "react";
import { useEffect, useState } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  List as ListType,
  Card as CardType,
  Board as BoardType,
} from "@/types";
import { List } from "@/components/dnd/List";
import { BoardSkeleton } from "@/components/dnd/BoardSkeleton";
import { Button } from "@/components/ui/Button";
import { api } from "@/libs/api";

export default function Home() {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);
  const [lists, setLists] = useState<ListType[]>([]);
  const [cards, setCards] = useState<Record<string, CardType[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [cardOpLoading, setCardOpLoading] = useState(false);
  const [cardOpError, setCardOpError] = useState("");

  useEffect(() => {
    api
      .getBoards()
      .then((data) => {
        setBoards(data);
        if (data.length > 0) {
          setActiveBoard(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeBoard) {
      setLoadingBoard(true);
      api
        .getLists(activeBoard._id)
        .then((fetchedLists) => {
          // Normalize IDs: always use _id in frontend
          const normalizedLists = fetchedLists
            .filter((list) => list._id || list.id) // Filter out lists without any ID
            .map((list) => ({
              ...list,
              _id: list._id || list.id || "", // Provide empty string as fallback
            }));
          setLists(normalizedLists);
          // Use cards from each list if available
          const cardsMap: Record<string, CardType[]> = {};
          normalizedLists.forEach((list) => {
            const key = list._id || list.id || "";
            cardsMap[key] = list.cards || [];
          });
          setCards(cardsMap);
        })
        .finally(() => setLoadingBoard(false));
    }
  }, [activeBoard]);

  const handleCreateBoard = async () => {
    const title = prompt("Enter board name:");
    if (title) {
      const newBoard = await api.createBoard({ title });
      setBoards([...boards, newBoard]);
      setActiveBoard(newBoard);
    }
  };

  const handleCreateList = async () => {
    if (newListTitle && activeBoard) {
      try {
        const newList = await api.createList({
          title: newListTitle,
          board: activeBoard._id,
        });
        setLists([...lists, newList]);
        setNewListTitle("");
        setIsCreatingList(false);
      } catch (error) {
        console.error("Failed to create list", error);
        // You could show an error message to the user here
      }
    }
  };

  // Helper to get all card ids for a list
  const getCardIds = (listId: string) =>
    (cards[listId] || []).map((card) => card._id);

  // Helper to get all cards for a list
  const getCards = (listId: string = "") => cards[listId] || [];

  // Handler to be passed to List for card creation
  const handleCreateCard = async (
    listId: string,
    cardData: Partial<CardType>,
    onSuccess: (card: CardType) => void,
  ) => {
    setCardOpLoading(true);
    setCardOpError("");
    try {
      const newCard = await api.createCard(cardData);
      onSuccess(newCard);
    } catch (err: any) {
      setCardOpError(err?.message || "Failed to create card");
    } finally {
      setCardOpLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // List drag
    if (
      active.data.current?.type === "List" &&
      over.data.current?.type === "List"
    ) {
      setLists((currentLists) => {
        const activeIndex = currentLists.findIndex((l) => l._id === active.id);
        const overIndex = currentLists.findIndex((l) => l._id === over.id);
        if (activeIndex === -1 || overIndex === -1) return currentLists;
        const newLists = arrayMove(currentLists, activeIndex, overIndex);
        newLists.forEach((list, idx) => {
          const newOrder = (idx + 1) * 1024;
          if (list.order !== newOrder)
            api.reorderList(list._id || "", newOrder);
        });
        return newLists;
      });
      return;
    }

    // Card drag
    if (active.data.current?.type === "Card") {
      const fromListId = active.data.current?.listId;
      const toListId = over.data.current?.listId;
      if (!fromListId || !toListId) return;
      if (!cards[fromListId] || !cards[toListId]) return;

      const activeIndex = cards[fromListId].findIndex(
        (c) => c._id === active.id,
      );
      let overIndex = cards[toListId].findIndex((c) => c._id === over.id);
      if (overIndex === -1) overIndex = cards[toListId].length;

      // Calculate new order value
      let newOrder;
      const toListCards = cards[toListId];
      if (toListCards.length === 0) {
        newOrder = 0;
      } else if (overIndex === 0) {
        newOrder = (toListCards[0].order || 0) - 1024;
      } else if (overIndex === toListCards.length) {
        newOrder = (toListCards[toListCards.length - 1].order || 0) + 1024;
      } else {
        const prevOrder = toListCards[overIndex - 1].order || 0;
        const nextOrder = toListCards[overIndex].order || 0;
        newOrder = (prevOrder + nextOrder) / 2;
      }

      const movedCard = {
        ...cards[fromListId][activeIndex],
        list: toListId,
        order: newOrder,
      };

      let newCards = { ...cards };
      newCards[fromListId] = [...newCards[fromListId]];
      newCards[toListId] = [...newCards[toListId]];
      newCards[fromListId].splice(activeIndex, 1);
      newCards[toListId].splice(overIndex, 0, movedCard);

      // Recalculate order for all cards in the destination list
      newCards[toListId] = newCards[toListId].map((card, idx) => ({
        ...card,
        order: (idx + 1) * 1024,
      }));
      // If card moved between lists, recalculate order for source list too
      if (fromListId !== toListId) {
        newCards[fromListId] = newCards[fromListId].map((card, idx) => ({
          ...card,
          order: (idx + 1) * 1024,
        }));
      }

      setCards(newCards);

      // Persist changes to the server for all affected cards
      setCardOpLoading(true);
      setCardOpError("");
      try {
        await Promise.all([
          ...newCards[toListId].map((card) =>
            api.updateCard(card._id, { order: card.order, list: card.list }),
          ),
          ...(fromListId !== toListId
            ? newCards[fromListId].map((card) =>
                api.updateCard(card._id, {
                  order: card.order,
                  list: card.list,
                }),
              )
            : []),
        ]);
      } catch (error: any) {
        setCardOpError(error?.message || "Failed to update card positions");
      } finally {
        setCardOpLoading(false);
      }
      return;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </aside>
        <main className="flex-1 p-4">
          <BoardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Loading overlay */}
      {cardOpLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-8 py-6 flex flex-col items-center gap-4">
            <svg
              className="animate-spin w-8 h-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Updating cards...
            </span>
          </div>
        </div>
      )}
      {/* Error popup */}
      {cardOpError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
            <span>{cardOpError}</span>
            <button
              className="ml-4 text-white/80 hover:text-white"
              onClick={() => setCardOpError("")}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <aside className="w-72 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Boards
          </h2>
          <div className="space-y-2">
            {boards.map((board) => (
              <button
                key={board._id}
                onClick={() => setActiveBoard(board)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeBoard?._id === board._id
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  {board.title}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleCreateBoard}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Board
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-auto">
        {loadingBoard ? (
          <BoardSkeleton />
        ) : activeBoard ? (
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {activeBoard.title}
              </h1>
              <button
                onClick={() => setIsCreatingList(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create List
              </button>
            </div>
            <SortableContext
              items={lists.map((l) => l._id || l.id || "")}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-6 mt-4">
                {[
                  ...(lists.length > 0
                    ? lists
                        .map((list) => {
                          const key: string = list._id
                            ? String(list._id)
                            : list.id
                              ? String(list.id)
                              : "";
                          return { list, key };
                        })
                        .filter(({ key }) => key.length > 0)
                        .map(({ list, key }) => (
                          <List
                            key={key}
                            list={list}
                            cards={getCards(key)}
                            onCardCreated={(card) => {
                              setCards((prev) => ({
                                ...prev,
                                [key]: [...(prev[key] || []), card],
                              }));
                            }}
                            onCreateCard={handleCreateCard}
                            onDelete={(listId) => {
                              setLists((prev) =>
                                prev.filter((l) => (l._id || l.id) !== listId),
                              );
                              setCards((prev) => {
                                const newCards = { ...prev };
                                delete newCards[listId];
                                return newCards;
                              });
                            }}
                          />
                        ))
                    : [
                        <div
                          key="empty-state"
                          className="flex flex-col items-center justify-center w-full py-16"
                        >
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                            <svg
                              className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              No lists yet. Create one to get started!
                            </p>
                            <button
                              onClick={() => setIsCreatingList(true)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              Create List
                            </button>
                          </div>
                        </div>,
                      ]),
                  isCreatingList ? (
                    <div
                      key="create-list-form"
                      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-72 h-fit p-4"
                    >
                      <input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        placeholder="Enter list title..."
                        className="w-full p-2 border dark:border-gray-600 rounded-lg mb-3 bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleCreateList}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Add List
                        </button>
                        <button
                          onClick={() => setIsCreatingList(false)}
                          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null,
                ]}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No boards found. Create one to get started!
              </p>
              <button
                onClick={handleCreateBoard}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Board
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
