import type { User } from '../types/index';

export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const getUserSession = (): User | null => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
};

export const setUserSession = (user: User) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const clearUserSession = () => {
  localStorage.removeItem('loggedInUser');
};

export const initializeUserTransactions = (userId: string) => {
  localStorage.setItem(`transactions_${userId}`, '[]');
};