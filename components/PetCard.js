/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

export default function PetCard({ petObj }) {
  const { user } = useAuth();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={petObj?.profileImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {petObj?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {petObj?.about}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Breed: {petObj?.breed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {petObj.owner?.city}, {petObj.owner?.state}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Owner: {petObj.owner?.first_name} {petObj.owner?.last_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      { user.id === petObj.owner?.id && (
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
      )}
    </Card>
  );
}

PetCard.propTypes = {
  petObj: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    profileImage: PropTypes.string,
    id: PropTypes.number,
    breed: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
