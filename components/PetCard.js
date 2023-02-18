/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTraitsByPet } from '../utils/data/traitData';
import { getInterestsByPet } from '../utils/data/interestData';

export default function PetCard({ petObj }) {
  const { user } = useAuth();
  const [traits, setTraits] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getTraitsByPet(petObj?.id).then(setTraits);
    getInterestsByPet(petObj?.id).then(setInterests);
  }, [petObj]);

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
          {traits.length > 0 && (
          <Typography variant="body2" color="text.secondary">Traits:
            {traits.map((trait) => (
              <span key={trait.trait_id} className="badge text-bg-dark">
                {trait.pet_trait?.title}
              </span>
            ))}
          </Typography>
          )}
          {interests.length > 0 && (
          <Typography variant="body2" color="text.secondary">Interests:
            {interests.map((interest) => (
              <span key={interest.interest_id} className="badge text-bg-dark">
                {interest.pet_interest?.title}
              </span>
            ))}
          </Typography>
          )}
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
  traitObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};