import React from 'react';
import NavBar from './nav-bar/NavBar';
import CartList from './cart-list/CartList';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <CartList />
    </>
  );
};

export default App;
