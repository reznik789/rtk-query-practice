import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItemType } from 'types/CartItem';
import { createSelector } from '@reduxjs/toolkit';

export const cartApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://course-api.com',
  }),
  reducerPath: 'cartApi',
  endpoints: build => ({
    getCartItems: build.query<CartItemType[], void>({
      query: () => `/react-useReducer-cart-project`,
    }),
  }),
});

export const clearCart = () =>
  cartApi.util.updateQueryData('getCartItems', undefined, () => {
    return [];
  });
export const updateAmount = (
  itemId: string,
  updateType: 'increment' | 'decrement',
) =>
  cartApi.util.updateQueryData('getCartItems', undefined, cartItems => {
    const index = cartItems.findIndex(({ id }) => id === itemId);
    if (index === -1) return cartItems;
    if (updateType === 'increment') (cartItems[index].amount += 1);
    else if (updateType === 'decrement') (cartItems[index].amount -= 1);
  });

export const removeItem = (itemId: string) =>
  cartApi.util.updateQueryData('getCartItems', undefined, cartItems => {
    return cartItems.filter(({ id }) => id !== itemId);
  });
const selectItemsResult = cartApi.endpoints.getCartItems.select();
const selectCartItems = createSelector(
  selectItemsResult,
  itemsResult => itemsResult?.data ?? [],
);
export const selectAmount = createSelector(selectCartItems, items =>
  items.reduce((acc, { amount }) => {
    acc += amount;
    return acc;
  }, 0),
);
export const selectTotalPrice = createSelector(selectCartItems, items =>
  items.reduce((acc, { amount, price }) => {
    acc += amount * parseFloat(price);
    return acc;
  }, 0),
);

export const { useGetCartItemsQuery } = cartApi;
