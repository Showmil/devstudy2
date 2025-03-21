import { create } from "zustand";

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create((set) => ({
  isloggedIn: getToken() ? true : false,
  storeLogin: (token) => {
    set({ isloggedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isloggedIn: false });
    removeToken();
  },
}));
