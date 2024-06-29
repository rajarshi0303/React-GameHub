import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist((set) => ({
    user: null,
    setUser: ({ id, name, password }) => set(() => ({ user: { id, name, password } })),
    clearUser: () => set(() => ({ user: null })),
}),
    {
        name: "user-storage", // unique name
    }
));
