import { create } from "zustand";

export const darkSlice = create((set) => ({
  isDark: false,
  setisDark: (fn) =>
    set((state) => ({
      isDark: typeof fn === "function" ? fn(state.isDark) : fn,
    })),
}));

export const sidebarSlice = create((set) => ({
  show: false,
  setshow: (fn) =>
    set((state) => ({
      show: typeof fn === "function" ? fn(state.show) : fn,
    })),
}));
