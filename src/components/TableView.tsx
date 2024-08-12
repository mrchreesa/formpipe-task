import React, { useState } from 'react';
import {
  Table,
  Avatar,
  Group,
  Button,
  Text,
  ActionIcon,
  Container,
  Flex,
  Image,
} from '@mantine/core';
import Ascending from '../assets/ascending.svg';
import Descending from '../assets/descending.svg';
export type User = {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
  roles: Array<string>;
};

type TableViewProps = {
  users: User[];
  onUserClick: (user: User) => void;

};

const TableView: React.FC<TableViewProps> = ({ users, onUserClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleSortName, setToggleSortName] = useState(true);
  const usersPerPage = 10;

  // Sort the users by name
  const sortedUsers = [...users].sort((a, b) => {
    if (toggleSortName) {
      // Ascending order
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    } else {
      // Descending order
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    }
  });

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSortName = () => {
    setToggleSortName((prev) => !prev);
  
  }

  console.log(currentUsers);
  

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  const rows = currentUsers.map((u, index) => (
    <Table.Tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => onUserClick(u)} >
      <Table.Td>{indexOfFirstUser + index + 1}</Table.Td>
      <Table.Td>
        {' '}
        <Avatar src={`/uploads/${u.avatar}`} alt={`Avatar for ${u.name}`} />
      </Table.Td>

      <Table.Td>{u.name}</Table.Td>
      <Table.Td>{u.eyes}</Table.Td>
      <Table.Td>{u.gender == 'male' ? 'M' : 'F'}</Table.Td>
      <Table.Td>{u.hair}</Table.Td>
      <Table.Td>{u.roles.join(', ')}</Table.Td>
      <Table.Td>{u.id}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Avatar</Table.Th>
            <Table.Th
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              Name
              <ActionIcon
                variant="transparent"
                aria-label="Sort by Name"
                onClick={handleSortName}
              >
                {!toggleSortName ? <Image src={Descending} /> : <Image src={Ascending} />}
              </ActionIcon>
            </Table.Th>
            <Table.Th>Eyes</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Hair</Table.Th>
            <Table.Th>Roles</Table.Th>
            <Table.Th>ID</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Container fluid>
        <Flex mt="md" align="center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Text mx="sm">{`Page ${currentPage} of ${totalPages}`}</Text>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default TableView;
