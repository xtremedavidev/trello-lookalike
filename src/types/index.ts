export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  isActive: boolean;
  preferences: {
    theme: "light" | "dark";
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  createdAt: string;
}

export interface Board {
  _id: string;
  title: string;
  description: string;
  owner: string;
  background: {
    type: "color" | "image";
    value: string;
  };
  isPublic: boolean;
  isArchived: boolean;
  tags: string[];
  lastActivity: string;
  createdAt: string;
  updatedAt?: string;
}

export interface List {
  _id: string;
  id?: string;
  title: string;
  board: string;
  order?: number;
  description?: string;
  color?: string;
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
  cards?: Card[];
}

export interface Card {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  isCompleted?: boolean;
  list: string;
  board: string;
  order?: number;
  color?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  assignees?: string[];
  dueDate?: string;
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}
