import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTotalAmountStore = create(
    persist(
        (set) => {
            return {
                totalAmount: 0,
                setTotalAmount: (amount) => set({ totalAmount: amount }),
            }
        },
        {
            name: "total", // Unique name for the store
            getStorage: () => sessionStorage,  // Use SessionStorage for persisting state
        }
    )
);
