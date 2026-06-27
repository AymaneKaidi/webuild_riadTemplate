import { createContext, useContext, useReducer, ReactNode } from 'react';

type WishlistState = {
  wishlistIds: string[];
};

type WishlistAction = 
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

const initialState: WishlistState = {
  wishlistIds: [],
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlistIds.includes(action.payload);
      return {
        ...state,
        wishlistIds: exists 
          ? state.wishlistIds.filter(id => id !== action.payload)
          : [...state.wishlistIds, action.payload]
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistIds: state.wishlistIds.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
}

const WishlistContext = createContext<{
  state: WishlistState;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
} | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const toggleWishlist = (id: string) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
  const removeFromWishlist = (id: string) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });

  return (
    <WishlistContext.Provider value={{ state, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
