import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

export default function ConversationCard({ messageObj }) {
  const { user } = useAuth();
  console.warn(messageObj);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // { user.id === messageObj?.receiver.id
          // image={messageObj?.sender.profile_image}}
          image={user.id === messageObj?.receiver.id ? messageObj?.sender.profile_image : messageObj?.receiver.profile_image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.id === messageObj?.receiver.id ? messageObj?.sender.first_name : messageObj?.receiver.first_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click here to view your messages
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ConversationCard.propTypes = {
  messageObj: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    profile_image: PropTypes.string,
    id: PropTypes.number,
    breed: PropTypes.string,
    sender: PropTypes.shape({
      id: PropTypes.string,
      profile_image: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    receiver: PropTypes.shape({
      id: PropTypes.string,
      profile_image: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  }).isRequired,
  traitObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
