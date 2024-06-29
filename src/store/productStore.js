import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useProductStore = create(
    persist(
        (set, get) => {
            return {
                productCart: [],
                // Initialize the game cart from the backend when the store is created
                initProductCart: async (userId) => {
                    try {
                        const response = await axios.get(`http://localhost:3000/productCart?userId=${userId}`);
                        set({ productCart: response.data });
                    } catch (error) {
                        console.error("Failed to fetch product cart from server:", error);
                    }
                },
                addProduct: async (product) => {
                    try {
                        const response = await axios.post("http://localhost:3000/productCart", product);
                        console.log(response.data)
                        const updatedCart = [...get().productCart, response.data];
                        set({ productCart: updatedCart });
                    } catch (error) {
                        console.error("Failed to add product to cart:", error);
                    }
                },
                removeProduct: async (productId) => {
                    try {
                        // Find the game object with the matching gameId
                        const foundproduct = get().productCart.find((product) => product.productId === productId);
                        console.log(foundproduct.id)

                        await axios.delete(`http://localhost:3000/productCart/${foundproduct.id}`);
                        const updatedCart = get().productCart.filter((product) => product.productId !== productId);
                        set({ productCart: updatedCart });
                    } catch (error) {
                        console.error("Failed to remove product from cart:", error);
                    }
                },
                // Selector to get the count of games in the cart
                getProductCount: () => {
                    return get().productCart.length;
                },
                increaseProductCount: async (productId) => {
                    const product = get().productCart.find((product) => product.productId === productId);
                    if (product) {
                        try {
                            const updatedProduct = { ...product, count: product.count + 1 };
                            await axios.put(`http://localhost:3000/productCart/${product.id}`, updatedProduct);
                            set((state) => ({
                                productCart: state.productCart.map((product) =>
                                    product.productId === productId ? updatedProduct : product
                                ),
                            }));
                        } catch (error) {
                            console.error("Failed to update product count:", error);
                        }
                    }
                },
                decreaseProductCount: async (productId) => {
                    const product = get().productCart.find((product) => product.productId === productId);
                    if (product) {
                        try {
                            const updatedProduct = { ...product, count: product.count - 1 };
                            await axios.put(`http://localhost:3000/productCart/${product.id}`, updatedProduct);
                            set((state) => ({
                                productCart: state.productCart.map((product) =>
                                    product.productId === productId ? updatedProduct : product
                                ),
                            }));
                        } catch (error) {
                            console.error("Failed to update product count:", error);
                        }
                    }
                },
            };
        },
        {
            name: "productStore", // Unique name for the store
            getStorage: () => localStorage, // Use localStorage for persisting state
        }
    )
);
