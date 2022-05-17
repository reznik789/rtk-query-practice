import React from 'react';
import { useSelector } from 'react-redux';
import { selectAmount } from 'features/cart/cartSlice';
import { AppBar, Container, Toolbar, Typography, Badge } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const NavBar: React.FC = () => {
  const amount = useSelector(selectAmount);
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <ConstructionIcon fontSize="large" />
          <Typography variant="h5" sx={{ mx: 2, flex: 1 }}>
            Redux Toolkit Practice
          </Typography>
          <Badge showZero badgeContent={amount} color="success">
            <ShoppingBasketIcon fontSize="large" />
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
