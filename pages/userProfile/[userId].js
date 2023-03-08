import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PetCard from '../../components/PetCard';
import ProfileCard from '../../components/ProfileCard';
import { getPetsByUser } from '../../utils/data/petData';
import getUser from '../../utils/data/userData';

function UserProfile() {
  const [pets, setPets] = useState([]);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;

  const getThisUser = () => {
    getUser(userId).then(setProfile);
  };

  const getUsersPets = () => {
    getPetsByUser(userId).then(setPets);
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    getUsersPets();
    console.log(profile);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      <div className="text-center my-4">
        <ProfileCard key={userId} userObj={profile} user={userId} opts={{ height: '160', width: '280' }} />
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
