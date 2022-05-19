import React from 'react';
import { removeItem, updateAmount } from 'services/api/cartApi';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { CartItemType } from 'types/CartItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppDispatch } from 'hooks';

type Props = CartItemType;

const CartItem: React.FC<Props> = ({ id, title, amount, price, img }) => {
  const dispatch = useAppDispatch();
  const handleIncrement = () => dispatch(updateAmount(id, 'increment'));
  const handleDecrement = () => {
    if (amount <= 1) return dispatch(removeItem(id));
    return dispatch(updateAmount(id, 'decrement'));
  };
  const handleRemove = () => dispatch(removeItem(id));
  return (
    <ListItem
      title={title}
      secondaryAction={
        <Box flexDirection="column">
          <IconButton
            onClick={handleIncrement}
            children={<KeyboardArrowUpIcon />}
          />
          <Typography align="center">{amount}</Typography>
          <IconButton
            onClick={handleDecrement}
            children={<KeyboardArrowDownIcon />}
          />
        </Box>
      }
      sx={{
        borderTop: 2,
        '&:last-child': {
          borderBottom: 2,
          borderColor: 'grey.300',
        },
        borderColor: 'grey.300',
      }}
    >
      <ListItemAvatar
        children={
          <Avatar
            src={img}
            variant="square"
            sx={{ height: '70px', width: '70px' }}
          />
        }
      />
      <ListItemText
        primary={title}
        primaryTypographyProps={{ sx: { pl: 1 } }}
        secondary={
          <Box display="flex" flexDirection="column" alignItems="start">
            <Typography variant="body2" color="secondary" sx={{ pl: 1 }}>
              $ {price}
            </Typography>
            <Button color="secondary" onClick={handleRemove}>
              remove
            </Button>
          </Box>
        }
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  );
};

export default CartItem;
