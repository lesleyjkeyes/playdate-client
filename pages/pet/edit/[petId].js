import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePet } from '../../../utils/data/petData';
import PetForm from '../../../components/forms/PetForm';

export default function EditPet() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { petId } = router.query;

  useEffect(() => {
    getSinglePet(petId).then(setEditItem);
  }, [petId]);

  return (<PetForm obj={editItem} />);
}
