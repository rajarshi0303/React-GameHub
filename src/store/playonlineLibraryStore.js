import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const usePlayOnlineLibrary = create(
    persist((set, get) => {
        return {
            onlineGames: [],
            initOnlineGames: async (userId) => {
                try {
                    const response = await axios.get(`http://localhost:3000/playOnlineLibrary?userId=${userId}`);
                    set({ onlineGames: response.data })
                } catch (error) {
                    console.error("Failed to fetch PlayOnline Games from server:", error);
                }
            },
            addOnlineGame: async (game) => {
                try {
                    const response = await axios.post("http://localhost:3000/playOnlineLibrary", game);
                    console.log(response.data)
                    const updatedCart = [...get().onlineGames, response.data];
                    set({ onlineGames: updatedCart });
                } catch (error) {
                    console.error("Failed to add PlayOnline Game to server:", error);
                }
            },
            removeOnlineGame: async (gameId) => {
                try {
                    // Find the game object with the matching gameId
                    const foundGame = get().onlineGames.find((game) => game.gameId === gameId);
                    console.log(foundGame.id)

                    await axios.delete(`http://localhost:3000/playOnlineLibrary/${foundGame.id}`);
                    const updatedCart = get().onlineGames.filter((game) => game.gameId !== gameId);
                    set({ onlineGames: updatedCart });

                } catch (error) {
                    console.error("Failed to remove Online Game from server:", error);
                }
            },
            getOnlineGameCount: () => {
                return get().onlineGames.length;
            }
        }
    },
        {
            name: "onlineGames", // Unique name for the store
            getStorage: () => localStorage, // Use localStorage for persisting state
        })) 