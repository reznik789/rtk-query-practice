import { configureStore } from '@reduxjs/toolkit';
import { cartApi } from 'services/api/cartApi';

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: gDM => gDM().concat(cartApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
