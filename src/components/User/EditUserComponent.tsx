import { useState } from 'react';
import { Button, TextInput, Select, Group, Container, Stack } from '@mantine/core';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../types/userTypes';


const EditUserComponent = () => {
  const location = useLocation();
  const user = location.state?.user as User | undefined;
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);


  const [name, setName] = useState(user?.name || '');
  const [gender, setGender] = useState<'female' | 'male' | null>(user?.gender || null);
  const [hair, setHair] = useState<'black' | 'brown' | 'blonde' | 'red' | 'grey' | null>(user?.hair || null);
  const [eyes, setEyes] = useState<'brown' | 'blue' | 'green' | null>(user?.eyes || null);
  const [glasses, setGlasses] = useState<boolean | null>(user?.glasses || null);
  const [roles, setRoles] = useState<string[]>(user?.roles || []);


  const handleSubmit = () => {
    if (!user?.id) return;

    setIsLoading(true);
    const updatedUser = {
      name,
      gender,
      hair,
      eyes,
      glasses,
      roles,
    };

    // Decided to use axios, since it's part of the tech stack in Formpipe
    axios
    .patch(`http://localhost:3000/users/${user?.id}`, updatedUser)
    .then(() => {
      alert('User updated successfully');
      navigate(`/users`);
    })
    .catch(error => {

      console.error('Error updating user:', error);
    }).finally(() => {
      setIsLoading(false);
    }
    );
};
  // Display a loading message while the user data is being fetched
  if (!user) return <div>Loading...</div>;

  return (
    <Container size="sm">
      <Stack>
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Select
          label="Gender"
          value={gender || ''}
          onChange={(value) => setGender(value as 'female' | 'male')}
          data={['male', 'female']}
        />
        <Select
          label="Hair Color"
          value={hair || ''}
          onChange={(value) => setHair(value as 'black' | 'brown' | 'blonde' | 'red' | 'grey')}
          data={['black', 'brown', 'blonde', 'red', 'grey']}
        />
        <Select
          label="Eye Color"
          value={eyes || ''}
          onChange={(value) => setEyes(value as 'brown' | 'blue' | 'green')}
          data={['brown', 'blue', 'green']}
        />
        <Select
          label="Glasses"
          value={glasses ? 'yes' : 'no'}
          onChange={(value) => setGlasses(value === 'yes')}
          data={['yes', 'no']}
        />
        <TextInput
          label="Roles"
          value={roles.join(', ')}
          onChange={(e) => setRoles(e.currentTarget.value.split(',').map(role => role.trim()))}
        />
        <Group align="right">
          <Button loading={isLoading} onClick={handleSubmit}>Save Changes</Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default EditUserComponent;
