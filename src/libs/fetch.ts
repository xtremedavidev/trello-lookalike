import Cookies from 'js-cookie';

export async function fetchWithCsrf(url: string, options: RequestInit = {}) {
  const csrfToken = Cookies.get('csrf-token');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'x-csrf-token': csrfToken || '',
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, {
    ...options,
    headers,
  });
} 