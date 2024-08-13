import { useEffect, useState } from 'react';
import {
  Button,
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
import SkeletonComponent from '../components/Skeleton';
import GridView from '@/components/GridView';
import GridIcon from '../assets/grid-icon.svg';
import GridBlack from '../assets/grid-black.svg';
import TableIcon from '../assets/table-icon.svg';
import TableBlack from '../assets/table-black.svg';
import TableView from '@/components/TableView';
import UserInfoModal from '@/components/User/UserInfoModal';
import { User } from '@/types/userTypes';

type FilterValues = {
  name: string;
  hair: 'Black' | 'Brown' | 'Blonde' | 'Red' | 'Grey' | null;
  eyes: 'Brown' | 'Blue' | 'Green' | 'Grey' | null;
  gender: 'Male' | 'Female' | null;
  glasses: 'all' | 'glasses' | 'no-glasses';
};


export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [opened, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [toggleGrid, setToggleGrid] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 
  const [modalOpened, { open, close }] = useDisclosure(false); 

  
  const filtersInitialValue: FilterValues = {
    name: '',
    hair: null ,
    eyes: null ,
    gender: null ,
    glasses: 'all',
  };
  const [filters, setFilters] = useState(filtersInitialValue);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const resetFilters = () => {
    setFilters(filtersInitialValue);
    setFilteredUsers(users);
  };

  const applyFilters = () => {
    let filtered = users;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.hair !== null) {
      filtered = filtered.filter((user) => 
        user.hair.toLowerCase() === filters.hair!.toLowerCase()
      );
    }
    
    if (filters.eyes !== null) {
      filtered = filtered.filter((user) => 
        user.eyes.toLowerCase() === filters.eyes!.toLowerCase()
      );
    }
    
    if (filters.gender !== null) {
      filtered = filtered.filter((user) => 
        user.gender.toLowerCase() === filters.gender!.toLowerCase()
      );
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

  const handleUserClick = (user: User) => {
    setSelectedUser(user); 
    open();
  };
  console.log(filters)
  console.log(filteredUsers);
  
  
  return (
    <>
      <Title order={1}>Users</Title>
      <Group justify="space-between" >
        <Button my={'md'} onClick={toggle}>
          {opened ? 'Hide filters' : 'Show Filters'}
        </Button>
        <Group>
          <Button px={0} mr={-10} variant="transparent" onClick={() => setToggleGrid(true)}>
           {toggleGrid ? <Image p="xs" px={0} h={60} src={GridBlack} alt="grid icon black" /> : <Image p="xs" px={0} h={60} src={GridIcon} alt="grid icon grey" />}
          </Button>
          <Button px={0} variant="transparent" onClick={() => setToggleGrid(false)}>
          {!toggleGrid ? <Image p="xs" px={0} h={65} src={TableBlack} alt="list icon black" /> :  <Image p="xs" px={0} h={65} src={TableIcon} alt="list icon grey" />}
          </Button>
        </Group>
      </Group>
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
                <Button variant="light" my={'md'} onClick={resetFilters}>
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
  {loading ? (
    <>
      <SkeletonComponent />
      <SkeletonComponent /> 
      <SkeletonComponent />
      <SkeletonComponent />
    </>
  ) : filteredUsers.length === 0 ? (  // Check if no users are found
    <div>No users found</div>  
  ) : toggleGrid ? (
    filteredUsers.map((user, index) => (
      <GridView key={index} user={user} onClick={() => handleUserClick(user)} />
    ))
  ) : (
    <TableView users={filteredUsers} onUserClick={handleUserClick} />
  )}
</Group>

      <UserInfoModal user={selectedUser} opened={modalOpened} onClose={close} />
    </>
  );
}
