import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MessageCard({ messageObj }) {
  return (
    <Card sx={{
      maxWidth: 1000,
    }}
    >
      <CardContent>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <CardContent>
            <CardMedia
              component="img"
              height="140"
              image={messageObj?.sender.profile_image}
              alt="green iguana"
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {messageObj?.sender.first_name} {messageObj?.sender.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {messageObj.content}
            </Typography>
          </CardContent>
        </CardContent>
      </CardContent>
    </Card>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    content: PropTypes.string,
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
  // onUpdate: PropTypes.func.isRequired,
};
