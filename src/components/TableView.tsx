import React from 'react';
import { Table, Avatar } from '@mantine/core';
import { A } from 'vitest/dist/reporters-O4LBziQ_';

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
};

const TableView: React.FC<TableViewProps> = ({ users }) => {
  
  const rows = users.map((u) => (
   
    
    <Table.Tr key={u.name}>
      <Table.Td>
        {' '}
        <Avatar src={`/uploads/${u.avatar}`} alt={`Avatar for ${u.name}`} />
      </Table.Td>
      <Table.Td>{u.name}</Table.Td>
      <Table.Td>{u.eyes}</Table.Td>
      <Table.Td>{u.gender}</Table.Td>
      <Table.Td>{u.hair}</Table.Td>
      <Table.Td>{u.roles.join(', ')}</Table.Td>
      <Table.Td>{u.id}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Avatar</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Eyes</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Hair</Table.Th>
          <Table.Th>Roles</Table.Th>
          <Table.Th>ID</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableView;
