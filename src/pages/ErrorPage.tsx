import React from 'react';
import { Container, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="xs" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Title order={1}>Oops!</Title>
      <Text size="lg" mt="md">Something went wrong.</Text>
      <Button mt="xl" onClick={() => navigate('/')}>Go to Home</Button>
    </Container>
  );
};

export default ErrorPage;
