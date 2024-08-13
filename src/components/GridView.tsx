import { Button, Card, Title, Image } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/userTypes';

type GridViewProps = {
  user: User;
  onClick: () => void;
};

const GridView: React.FC<GridViewProps> = ({ user, onClick }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/users/view/${user.id}`, { state: { user } });
  };
  return (
    <Card
      radius={'md'}
      withBorder
      w={238}
      shadow="sm"
      padding="lg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
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
        onClick={handleViewClick}
      >
        View
      </Button>
    </Card>
  );
};

export default GridView;
