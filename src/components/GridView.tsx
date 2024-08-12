import { Button, Card, Title, Image } from '@mantine/core'
import React from 'react'


export type User = {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
};

type GridViewProps = {
  user: User; 
};

const GridView: React.FC<GridViewProps> = ({ user }) => {
  return (
    <Card radius={'md'} withBorder  w={238}>
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
  )
}

export default GridView