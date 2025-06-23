import Cookies from "js-cookie";
import { Board, Card, List, User } from "@/types";

type RequestInit = globalThis.RequestInit;

class BoardHubAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getToken() {
    return Cookies.get("token");
  }

  setToken(token: string) {
    Cookies.set("token", token, { expires: 7, path: "/" });
  }

  removeToken() {
    Cookies.remove("token", { path: "/" });
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    if (token) {
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        this.removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      throw new Error(data.message || "API request failed");
    }

    return data;
  }

  // Authentication
  async login(email: string, password: string): Promise<User> {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.data.token);
    return data.data.user;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    this.setToken(data.data.token);
    return data.data.user;
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    this.removeToken();
  }

  async getMe(): Promise<User> {
    const data = await this.request("/auth/me");
    return data.data.user;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const data = await this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
    return data.data.user;
  }

  // Boards
  async getBoards(): Promise<Board[]> {
    const data = await this.request("/boards");
    return data.data.boards;
  }

  async createBoard(boardData: Partial<Board>): Promise<Board> {
    const data = await this.request("/boards", {
      method: "POST",
      body: JSON.stringify(boardData),
    });
    return data.data.board;
  }

  async updateBoard(
    boardId: string,
    boardData: Partial<Board>,
  ): Promise<Board> {
    const data = await this.request(`/boards/${boardId}`, {
      method: "PUT",
      body: JSON.stringify(boardData),
    });
    return data.data.board;
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.request(`/boards/${boardId}`, { method: "DELETE" });
  }

  // Lists
  async getLists(boardId: string): Promise<List[]> {
    const data = await this.request(`/lists/board/${boardId}`);
    return data.data.lists;
  }

  async createList(listData: Partial<List>): Promise<List> {
    const data = await this.request("/lists", {
      method: "POST",
      body: JSON.stringify(listData),
    });
    return data.data.list;
  }

  async updateList(listId: string, listData: Partial<List>): Promise<List> {
    const data = await this.request(`/lists/${listId}`, {
      method: "PUT",
      body: JSON.stringify(listData),
    });
    return data.data.list;
  }

  async reorderList(listId: string, newOrder: number) {
    return this.request(`/lists/${listId}/reorder`, {
      method: "PUT",
      body: JSON.stringify({ newOrder }),
    });
  }

  // Cards
  async getCards(listId: string): Promise<Card[]> {
    const data = await this.request(`/cards/list/${listId}`);
    return data.data.cards;
  }

  async createCard(cardData: Partial<Card>): Promise<Card> {
    const data = await this.request("/cards", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
    return data.data.card;
  }

  async updateCard(cardId: string, cardData: Partial<Card>): Promise<Card> {
    const data = await this.request(`/cards/${cardId}`, {
      method: "PUT",
      body: JSON.stringify(cardData),
    });
    return data.data.card;
  }

  async deleteCard(cardId: string): Promise<void> {
    await this.request(`/cards/${cardId}`, { method: "DELETE" });
  }

  async moveCard(
    cardId: string,
    newListId: string,
    newOrder: number,
  ): Promise<Card> {
    const data = await this.request(`/cards/${cardId}/move`, {
      method: "PUT",
      body: JSON.stringify({ newListId, newOrder }),
    });
    return data.data.card;
  }

  async deleteList(listId: string): Promise<void> {
    await this.request(`/lists/${listId}`, { method: "DELETE" });
  }
}

export const api = new BoardHubAPI("https://boardhub-backend.onrender.com/api");
