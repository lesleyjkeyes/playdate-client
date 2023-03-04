/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { checkFollow, createFollow, deleteSingleFollow } from '../utils/data/followData';
import { useAuth } from '../utils/context/authContext';

export default function ProfileCard({ userObj }) {
  const [follow, setFollow] = useState({});
  const { user } = useAuth();

  const checkUsersFollows = () => {
    checkFollow(user.id, userObj.id).then((data) => {
      console.warn(data[0]);
      const followObject = data[0];
      setFollow(followObject);
    });
  };

  useEffect(() => {
    checkUsersFollows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userObj]);

  const handleFollowChange = () => {
    if (follow) {
      deleteSingleFollow(follow.id).then(checkUsersFollows);
    } else {
      createFollow(user.id, userObj.id).then(checkUsersFollows);
    }
  };

  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardActionArea>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <CardContent>
            <CardMedia
              component="img"
              height="200"
              image={userObj?.profileImage}
              alt={userObj?.firstName}
            />
          </CardContent>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {userObj?.firstName} {userObj?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userObj?.about}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              City: {userObj?.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              State: {userObj?.state}
            </Typography>
          </CardContent>
        </CardContent>
      </CardActionArea>
      {follow
        ? (
          <Button size="small" color="primary" onClick={() => handleFollowChange()}>
            Unfollow
          </Button>
        )
        : (
          <Button size="small" color="primary" onClick={() => handleFollowChange()}>
            Follow
          </Button>
        )}
    </Card>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profileImage: PropTypes.string,
    about: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
