import React from 'react';
import { List, ListItem, Skeleton } from '@mui/material';

const CartListSkeleton: React.FC = () => {
  return (
    <List>
      {[1, 2, 3, 4].map(num => (
        <ListItem
          key={num}
          sx={{
            width: '100%',
          }}
        >
          <Skeleton variant="rectangular" height={70} width={'100%'} />
        </ListItem>
      ))}
    </List>
  );
};

export default CartListSkeleton;
