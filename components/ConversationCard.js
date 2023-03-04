import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function ConversationCard({ conversationObj }) {
  const { user } = useAuth();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/conversations/messages/${conversationObj?.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={user.id === conversationObj?.user_one.id ? conversationObj?.user_two.profile_image : conversationObj?.user_one.profile_image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.id === conversationObj?.user_one.id ? conversationObj?.user_two.first_name : conversationObj?.user_one.first_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click here to view your messages
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

ConversationCard.propTypes = {
  conversationObj: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    profile_image: PropTypes.string,
    id: PropTypes.number,
    breed: PropTypes.string,
    user_one: PropTypes.shape({
      id: PropTypes.string,
      profile_image: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    user_two: PropTypes.shape({
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
