import { Flex, Text, Image, Card } from '@mantine/core';
import { useLocation } from 'react-router-dom';

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

type UserInfoModalProps = {
  user: User | null;
};

const UserInfoComponent = () => {
  const location = useLocation();
  const user = location.state?.user as User | undefined;

  if (!user) {
    return <Text>User data not available.</Text>;
  }
  return (
    <Card radius={'md'} withBorder w="100%" shadow="sm" padding="lg">
      <Flex align="center" justify="space-around">
        <Flex ml="sm" mb="lg" direction="column" gap="sm">
          <Text size="xl">
            <strong>Name:</strong> {user.name}
          </Text>
          <Text size="xl">
            <strong>Gender:</strong> {user.gender}
          </Text>
          <Text size="xl">
            <strong>Hair Color:</strong> {user.hair}
          </Text>
          <Text size="xl">
            <strong>Eye Color:</strong> {user.eyes}
          </Text>
          <Text size="xl">
            <strong>Roles:</strong> {user.roles.join(', ')}
          </Text>
          <Text size="xl">
            <strong>ID:</strong> {user.id}
          </Text>
        </Flex>

        <Image
          mr="sm"
          //   mt={-40}
          height={400}
          width={150}
          radius="md"
          src={`/uploads/${user.avatar}`}
          alt={`Avatar for ${user.name}`}
        />
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <Text size="xl" my="lg">
          <strong>Personal Statement</strong>
        </Text>
        <Text size="xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis soluta doloribus nisi,
          veniam consectetur in, expedita deleniti, reiciendis enim dolor temporibus. Dolorem
          temporibus libero cupiditate! Quas vel aut veniam sunt. A illum earum, illo necessitatibus
          amet voluptatem, quaerat ut, non dolorum ad vitae quas praesentium. Minima quasi cum optio
          sit, dolore natus maiores laudantium fugit saepe amet, dolores, architecto atque. Delectus
          modi deleniti asperiores consequuntur, beatae cum sed. Distinctio numquam delectus amet
          nisi repellat autem laudantium iste, repellendus dolorum tempora voluptatibus in ipsam
          optio nulla? Saepe, at. Ut, vero adipisci. Repellat perspiciatis dolores voluptate
          delectus ea sit excepturi id placeat vero, vitae quam tempore voluptatum accusamus hic, ut
          magni tempora, inventore aspernatur consequatur at. Maxime rem autem vel illum facere.
          Eius quod accusantium inventore molestiae velit rerum nesciunt expedita nemo, voluptates
          quas mollitia voluptatum illo voluptatibus? Ducimus ullam officiis beatae, error accusamus
          voluptates asperiores nam ut magni sapiente eos nulla!
        </Text>
      </Flex>
    </Card>
  );
};

export default UserInfoComponent;
