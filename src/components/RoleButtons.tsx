import React, { useState } from 'react';
import { Button, Group, Flex, Title } from '@mantine/core';
import { User } from '../types/userTypes';

type RoleButtonsProps = {
  users: User[];
  filteredUsers: User[];
  selectedRoles: string[];
  handleRoleClick: (role: string) => void;
  loading: boolean;
};

const RoleButtons: React.FC<RoleButtonsProps> = ({ users, selectedRoles, loading, handleRoleClick }) => {
    
    
  // Get all roles without duplicates
  const allRoles = Array.from(new Set(users.flatMap((user) => user.roles)));

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Group mb="md">
     <Flex direction='column' align='center'>
          <Title mb='sm' order={3}>Group by Roles</Title>
        <Flex justify='space-evenly'>
        {allRoles.map((role) => (
          <Button
          mx='xs'
            key={role}
            onClick={() => handleRoleClick(role)}
            variant={selectedRoles.includes(role) ? 'filled' : 'outline'}
          >
            {role}
          </Button>
          
        ))}
        </Flex>
        </Flex>
      </Group>

      
    </div>
  );
};

export default RoleButtons;
