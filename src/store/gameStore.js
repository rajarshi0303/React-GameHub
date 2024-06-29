import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useGameStore = create(
    persist(
        (set, get) => {
            return {
                gameCart: [],
                // Initialize the game cart from the backend when the store is created
                initGameCart: async (userId) => {
                    try {
                        const response = await axios.get(`http://localhost:3000/gameCart?userId=${userId}`);
                        console.log("use Logined In", response.data)
                        set({ gameCart: response.data });
                    } catch (error) {
                        console.error("Failed to fetch game cart from server:", error);
                    }
                },
                addGame: async (game) => {
                    try {
                        const response = await axios.post("http://localhost:3000/gameCart", game);
                        console.log(response.data)
                        const updatedCart = [...get().gameCart, response.data];
                        set({ gameCart: updatedCart });
                    } catch (error) {
                        console.error("Failed to add game to cart:", error);
                    }
                },
                removeGame: async (gameId) => {
                    try {
                        // Find the game object with the matching gameId
                        const foundGame = get().gameCart.find((game) => game.gameId === gameId);
                        console.log(foundGame.id)

                        await axios.delete(`http://localhost:3000/gameCart/${foundGame.id}`);
                        const updatedCart = get().gameCart.filter((game) => game.gameId !== gameId);
                        set({ gameCart: updatedCart });
                    } catch (error) {
                        console.error("Failed to remove game from cart:", error);
                    }
                },
                // Selector to get the count of games in the cart
                getGameCount: () => {
                    return get().gameCart.length;
                },
            };
        },
        {
            name: "gameStore", // Unique name for the store
            getStorage: () => localStorage, // Use localStorage for persisting state
        }
    )
);
