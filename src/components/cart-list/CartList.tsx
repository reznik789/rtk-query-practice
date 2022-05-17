import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Typography, Container, Box, Button } from '@mui/material';
import CartItem from 'components/cart-list/CartItem';
import {
  clearCart,
  selectTotalPrice,
  useCartItems,
} from 'features/cart/cartSlice';
import CartListSkeleton from 'components/cart-list/CartListSkeleton';

const CartList: React.FC = () => {
  const [cartItems, isLoading] = useCartItems();
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: 'uppercase', my: 3 }}
      >
        Your Bag
      </Typography>
      {isLoading ? (
        <CartListSkeleton />
      ) : cartItems.length === 0 ? (
        <Typography
          align="center"
          sx={{ textTransform: 'uppercase' }}
          variant="h6"
          mt={3}
        >
          is empty right now
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map(cartItem => (
              <CartItem key={cartItem.id} {...cartItem} />
            ))}
          </List>
          <Box display="flex" justifyContent="space-between" m={3}>
            <Typography variant="h5" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              $ {totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box textAlign="center" mb={3}>
            <Button variant="outlined" onClick={handleClearCart}>
              Clear Bag
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartList;
