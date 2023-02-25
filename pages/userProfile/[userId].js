import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PetCard from '../../components/PetCard';
import { useAuth } from '../../utils/context/authContext';
import { getPetsByUser } from '../../utils/data/petData';
import getUser from '../../utils/data/userData';

function UserProfile() {
  const [pets, setPets] = useState([]);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuth();

  const getThisUser = () => {
    getUser(userId).then(setProfile);
    console.warn(profile);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      { user ? (
        <div className="text-center my-4">
          <h2>{profile?.firstName} {profile?.lastName}</h2>
          <div className="petCards">
            {pets?.map((pet) => (
              <PetCard key={pet.id} petObj={pet} onUpdate={getUsersPets} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Sign in to see your profile</h2>
        </div>
      )}
    </>
  );
}

export default UserProfile;
