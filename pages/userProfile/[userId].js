import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PetCard from '../../components/PetCard';
import { useAuth } from '../../utils/context/authContext';
import { createFollow, checkFollow, deleteSingleFollow } from '../../utils/data/followData';
import { getPetsByUser } from '../../utils/data/petData';
import getUser from '../../utils/data/userData';

function UserProfile() {
  const [pets, setPets] = useState([]);
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuth();

  const getThisUser = () => {
    getUser(userId).then(setProfile);
  };

  const getUsersPets = () => {
    getPetsByUser(userId).then(setPets);
  };

  const checkUsersFollows = () => {
    checkFollow(user.id, userId).then((data) => {
      const followObject = data[0];
      setFollow(followObject);
    });
  };

  const handleFollowChange = () => {
    if (follow) {
      deleteSingleFollow(follow.id).then(checkUsersFollows);
    } else {
      createFollow(user.id, userId).then(checkUsersFollows);
    }
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    checkUsersFollows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    getUsersPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      <div className="text-center my-4">
        <h2>{profile?.firstName} {profile?.lastName}</h2>

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

        <div className="petCards">
          {pets?.map((pet) => (
            <PetCard key={pet.id} petObj={pet} onUpdate={getUsersPets} />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
