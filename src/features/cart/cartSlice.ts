import { useEffect } from 'react';
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItem';
import { cartItems } from '../../api/cartItems';
import { AppDispatch, RootState } from '../../store';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export type CartStateType = {
  items: CartItemType[];
  isLoading: boolean;
};

const initialState: CartStateType = {
  items: cartItems,
  isLoading: false,
};

export const getCartItemsRequest = createAsyncThunk(
  'cart/getCartItemsRequest',
  async () => {
    const { data } = await axios.get<CartItemType[]>(
      'https://course-api.com/react-useReducer-cart-project',
    );
    return data;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.items = [];
    },
    increment: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(({ id }) => id === action.payload);
      if (index === -1) return;
      state.items[index].amount += 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(({ id }) => id === action.payload);
      if (index === -1) return;
      state.items[index].amount -= 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCartItemsRequest.pending, state => {
        state.isLoading = true;
        state.items = [];
      })
      .addCase(getCartItemsRequest.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItemsRequest.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export const selectItems = (state: RootState) => state.cart.items;
export const selectAmount = createSelector(selectItems, items =>
  items.reduce((acc, { amount }) => {
    acc += amount;
    return acc;
  }, 0),
);
export const selectTotalPrice = createSelector(selectItems, items =>
  items.reduce((acc, { amount, price }) => {
    acc += amount * parseFloat(price);
    return acc;
  }, 0),
);

export const useCartItems = (): [CartItemType[], boolean] => {
  const { items, isLoading } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, []);

  return [items, isLoading];
};

export const { clearCart, increment, decrement, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
