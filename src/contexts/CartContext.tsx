import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

// Authoritative price map — used to recover items whose price was corrupted in localStorage
// (NaN serializes to null in JSON, which loads back as 0)
const staticPriceMap: Record<number, number> = {
  1: 899,
  2: 750,
  3: 1450,
  4: 950,
  5: 150,
  6: 450,
  7: 1200,
  8: 550,
  9: 350,
  10: 650,
  11: 2500,
};

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ayurveda_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Heal any items whose price is null/0/NaN from previous bad saves
        const healed = parsed.map((item: CartItem) => ({
          ...item,
          price: (item.price && !isNaN(item.price))
            ? item.price
            : (staticPriceMap[item.id] ?? 0),
        }));
        setCart(healed);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('ayurveda_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(String(product.price).replace(/,/g, '')),
          quantity: 1,
          image: product.image || (product.images?.[0]?.src || product.images?.[0] || ''),
          category: product.category || (product.categories?.[0]?.name || 'Uncategorized'),
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
