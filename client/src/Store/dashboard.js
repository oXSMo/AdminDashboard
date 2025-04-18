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

export const categorySlice = create((set) => ({
  credentials: {
    name: "",
    image: "",
    description: "",
  },
  setcredentials: (fn) =>
    set((state) => ({
      credentials: typeof fn === "function" ? fn(state.credentials) : fn,
    })),
}));

export const shipSlice = create((set) => ({
  credentials: {
    Client: "",
    MobileA: "",
    Adresse: "",
    Commune: "",
    Total: 0,
    TProduit: "",
    Confrimee: "",
    TypeColis: "0",
    TypeLivraison: "0",
    IDWilaya: "1",
    Note: "",
  },
  setcredentials: (fn) =>
    set((state) => ({
      credentials: typeof fn === "function" ? fn(state.credentials) : fn,
    })),
}));

export const itemSlice = create((set) => ({
  credentials: { name: "", description: "", available: false, price: 0 },
  setcredentials: (fn) =>
    set((state) => ({
      credentials: typeof fn === "function" ? fn(state.credentials) : fn,
    })),
  options: [],
  setoptions: (fn) =>
    set((state) => ({
      options: typeof fn === "function" ? fn(state.options) : fn,
    })),
  optionsCount: 1,
  setoptionsCount: (fn) =>
    set((state) => ({
      optionsCount: typeof fn === "function" ? fn(state.optionsCount) : fn,
    })),
}));

export const profileSlice = create((set) => ({
  profile: { name: "", description: "", available: false, price: 0 },
  setprofile: (fn) =>
    set((state) => ({
      profile: typeof fn === "function" ? fn(state.profile) : fn,
    })),
}));
