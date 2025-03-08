import { create } from "zustand";

export const dashboardSlice = create((set) => ({
  total: null,
  settotal: (fn) =>
    set((state) => ({
      total: typeof fn === "function" ? fn(state.total) : fn,
    })),
}));

export const orderSlice = create((set) => ({
  credentials: {
    options: [],
    status: "pending",
    totalPrice: 0,
    item: "",
    user: "67a556fc3bfd6fba32e07cb8",
    node: "",
    password: "",
    model: "",
    manufacture: "",
    serialNumber: "",
    image: "",
    img: "",
  },
  setcredentials: (fn) =>
    set((state) => ({
      credentials: typeof fn === "function" ? fn(state.credentials) : fn,
    })),
}));
