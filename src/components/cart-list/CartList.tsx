import React from 'react';
import { List, Typography, Container, Box, Button } from '@mui/material';
import CartItem from './CartItem';
import { cartItems } from '../../api/cartItems';

const CartList: React.FC = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: 'uppercase', my: 3 }}
      >
        Your Bag
      </Typography>
      {!Array.isArray(cartItems) || cartItems.length === 0 ? (
        <Typography align="center" sx={{textTransform: 'uppercase'}} variant="h6" mt={3}>is empty right now</Typography>
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
              $ 0
            </Typography>
          </Box>
          <Box textAlign="center" mb={3}>
            <Button variant="outlined">Clear Bag</Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartList;
