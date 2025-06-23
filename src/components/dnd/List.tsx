'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from './Card';
import { List as ListType, Card as CardType } from '@/types';
import { useState, useRef, useEffect } from 'react';
import { api } from '@/libs/api';

export function List({ 
  list, 
  cards, 
  onCardCreated, 
  onCreateCard,
  onDelete,
}: { 
  list: ListType, 
  cards: CardType[], 
  onCardCreated?: (card: CardType) => void, 
  onCreateCard?: (listId: string, cardData: Partial<CardType>, onSuccess: (card: CardType) => void) => void,
  onDelete?: (listId: string) => void,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: list.id || list._id || '',
    data: {
      type: 'List',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddCard = async () => {
    if (!cardTitle.trim()) return;
    let newOrder = 0;
    if (cards.length > 0) {
      newOrder = (cards[cards.length - 1].order || 0) + 1024;
    }
    const cardData = {
      title: cardTitle,
      list: list._id || list.id || '',
      board: list.board,
      order: newOrder
    };
    if (onCreateCard) {
      onCreateCard(list._id || list.id || '', cardData, (newCard) => {
        setCardTitle('');
        setIsAdding(false);
        if (onCardCreated) onCardCreated(newCard);
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddCard();
    }
    if (e.key === 'Escape') {
      setIsAdding(false);
    }
  };

  const handleUpdateList = async () => {
    if (!editedTitle.trim()) {
      setEditedTitle(list.title);
      setIsEditing(false);
      return;
    }
    try {
      await api.updateList(list._id || list.id || '', { title: editedTitle });
      list.title = editedTitle;
      setIsEditing(false);
    } catch (error) {
      setGlobalError('Failed to update list');
      setEditedTitle(list.title);
    }
  };

  const handleDeleteList = async () => {
    if (!confirm('Are you sure you want to delete this list and all its cards?')) return;
    try {
      await api.deleteList(list._id || list.id || '');
      onDelete?.(list._id || list.id || '');
    } catch (error) {
      setGlobalError('Failed to delete list');
    }
  };

  const handleCardDelete = (cardId: string) => {
    const newCards = cards.filter(c => c._id !== cardId);
    if (onCardCreated) {
      const updatedList = { ...list, cards: newCards };
      onCardCreated(updatedList as any);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-72 flex flex-col max-h-[calc(100vh-12rem)] group"
    >
      <div className="p-3 flex items-center justify-between rounded-t-lg border-b dark:border-gray-700">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdateList}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdateList();
              }
              if (e.key === 'Escape') {
                setIsEditing(false);
                setEditedTitle(list.title);
              }
            }}
            className="flex-1 p-1 border dark:border-gray-600 rounded bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            autoFocus
          />
        ) : (
          <h2 className="font-medium text-gray-800 dark:text-white">{list.title}</h2>
        )}
        <button 
          ref={menuButtonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="absolute right-2 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit List
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteList();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              Delete List
            </button>
          </div>
        )}
      </div>
      <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 px-2 py-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {cards.map(card => (
            <Card 
              key={card._id} 
              card={card} 
              listId={list.id || list._id || ''} 
              onDelete={handleCardDelete}
            />
          ))}
        </div>
      </SortableContext>
      {isAdding ? (
        <div className="p-2 border-t dark:border-gray-700">
          <textarea
            value={cardTitle}
            onChange={e => setCardTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border dark:border-gray-600 rounded-md mb-2 bg-transparent dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent resize-none"
            placeholder="Enter a title for this card..."
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddCard}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors duration-200 text-sm"
            >
              Add Card
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-b-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add a card
        </button>
      )}
      {globalError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
            </svg>
            <span>{globalError}</span>
            <button className="ml-4 text-white/80 hover:text-white" onClick={() => setGlobalError('')}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
} 