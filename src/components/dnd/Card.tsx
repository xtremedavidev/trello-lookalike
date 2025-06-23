"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "@/types";
import { useState, useRef, useEffect } from "react";
import { api } from "@/libs/api";

export function Card({
  card,
  listId,
  onDelete,
}: {
  card: CardType;
  listId: string;
  onDelete?: (cardId: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(card);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card._id,
      data: {
        type: "Card",
        listId,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdateCard = async () => {
    if (!editedCard.title.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const updatedCard = await api.updateCard(card._id, {
        title: editedCard.title,
        description: editedCard.description,
        priority: editedCard.priority,
        isCompleted: editedCard.isCompleted,
      });
      Object.assign(card, updatedCard);
      setIsEditing(false);
    } catch (err: any) {
      setError(err?.message || "Failed to update card");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async () => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    setIsLoading(true);
    setError("");
    try {
      await api.deleteCard(card._id);
      onDelete?.(card._id);
      setIsMenuOpen(false);
    } catch (err: any) {
      setError(err?.message || "Failed to delete card");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setEditedCard(card); // Reset form
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3 cursor-pointer hover:shadow-md dark:hover:bg-gray-600 transition-all duration-200 group relative"
      >
        <div className="flex flex-col gap-2">
          <div className="font-medium text-gray-700 dark:text-white break-words">
            {card.title}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {card.labels &&
              card.labels.map((label, index) => (
                <span
                  key={index}
                  className="inline-block text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${label.color}15`,
                    color: label.color,
                    border: `1px solid ${label.color}30`,
                  }}
                >
                  {label.name}
                </span>
              ))}
          </div>
          {card.description && (
            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {card.description}
            </div>
          )}
          <div className="flex items-center justify-between mt-1">
            {card.priority && (
              <span
                className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium border ${
                  card.priority === "high"
                    ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                    : card.priority === "medium"
                      ? "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                      : "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                }`}
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0-3l-4.5 1L12 6l4.5 11L12 16z" />
                </svg>
                {card.priority}
              </span>
            )}
            <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
              {card.dueDate && (
                <span className="flex items-center text-xs gap-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(card.dueDate).toLocaleDateString()}
                </span>
              )}
              {card.description && (
                <span className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={handleMenuClick}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
            >
              <button
                type="button"
                onClick={handleEditClick}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Card
              </button>
              <button
                type="button"
                onClick={handleDeleteCard}
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                Delete Card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
          onClick={handleModalClose}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Edit Card
              </h3>
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedCard.title}
                    onChange={(e) =>
                      setEditedCard({ ...editedCard, title: e.target.value })
                    }
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editedCard.description || ""}
                    onChange={(e) =>
                      setEditedCard({
                        ...editedCard,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={editedCard.priority || "low"}
                    onChange={(e) =>
                      setEditedCard({
                        ...editedCard,
                        priority: e.target.value as "low" | "medium" | "high",
                      })
                    }
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`isCompleted-${card._id}`}
                    checked={editedCard.isCompleted}
                    onChange={(e) =>
                      setEditedCard({
                        ...editedCard,
                        isCompleted: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor={`isCompleted-${card._id}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Mark as completed
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateCard}
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
