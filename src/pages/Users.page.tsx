import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Collapse,
  Group,
  Image,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export type User = {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
};

/**
 * The UsersPage contacts the mock web server to fetch the list of users and displays them in a grid.
 */
export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [opened, { toggle }] = useDisclosure(false);
  const filtersInitialValue = {
    name: '',
    hair: null,
    eyes: null,
    gender: null,
    glasses: 'all',
  }
  const [filters, setFilters] = useState(filtersInitialValue);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data); 
      })
      .catch((error) => console.error(error));
  }, []);

  const resetFilters = () => {
    setFilters(filtersInitialValue);
    setFilteredUsers(users);
  }

  const applyFilters = () => {
    let filtered = users;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.hair) {
      filtered = filtered.filter((user) => user.hair === filters.hair);
    }

    if (filters.eyes) {
      filtered = filtered.filter((user) => user.eyes === filters.eyes);
    }

    if (filters.gender) {
      filtered = filtered.filter((user) => user.gender === filters.gender);
    }

    if (filters.glasses !== 'all') {
      const hasGlasses = filters.glasses === 'glasses';
      filtered = filtered.filter((user) => user.glasses === hasGlasses);
    }

    setFilteredUsers(filtered);
  };
  
  const handleTextInputChange = (value: string) => {
    setFilters({ ...filters, name: value });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  console.log(filters);
  
  return (
    <>
      <Title order={1}>Users</Title>

      <Button my={'md'} onClick={toggle}>
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

      <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'} miw={600}>
          <Stack gap={10}>
            <Group grow wrap={'wrap'}>
              <TextInput
                label="Name"
                placeholder="Enter user's name to filter list"
                value={filters.name}
                onChange={(event) => handleTextInputChange(event.currentTarget.value)}
              />
              <Select
                label="Hair Colour"
                placeholder="Pick value to filter list"
                data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
                value={filters.hair}
                onChange={(value) => handleFilterChange('hair', value!)}
              />
              <Select
                label="Eye Colour"
                placeholder="Pick value"
                data={['Brown', 'Blue', 'Green', 'Grey']}
                value={filters.eyes}
                onChange={(value) => handleFilterChange('eyes', value!)}
              />
              <Select
                label="Gender"
                placeholder="Pick value"
                data={['Male', 'Female']}
                value={filters.gender}
                onChange={(value) => handleFilterChange('gender', value!)}
              />
            </Group>

            <Radio.Group
              label="Glasses?"
              value={filters.glasses}
              onChange={(value) => handleFilterChange('glasses', value!)}
            >
              <Group align="center" grow>
                <Group>
                  <Radio label="All" value="all" />
                  <Radio label="Glasses" value="glasses" />
                  <Radio label="No Glasses" value="no-glasses" />
                </Group>
                <Button variant='light' my={'md'} onClick={resetFilters}>
                  {'Reset Filters'}
                </Button>
                <Button my={'md'} onClick={applyFilters}>
                  {'Apply Filters'}
                </Button>
                
              </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

      <Group miw={600}>
        {filteredUsers.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={238}>
            <Card.Section>
              {/* We know where the images are, so we just grab the file based on the filename associated with the user */}
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/view/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group>
    </>
  );
}
