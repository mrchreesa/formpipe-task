import { Modal,Text, Image, Flex } from '@mantine/core';
import { User } from '../../types/userTypes';

type UserInfoModalProps = {
  user: User | null;
  opened: boolean; 
  onClose: () => void; 
};

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, opened, onClose }) => {
  if (!user) return null; 

  return (
    <Modal opened={opened} onClose={onClose} centered>
    <Flex align="center" >

    <Flex ml='sm' mb="lg" direction="column" gap="sm" style={{ flex: 1 }}>
      <Text><strong>Name:</strong> {user.name}</Text>
      <Text><strong>Gender:</strong> {user.gender}</Text>
      <Text><strong>Hair Color:</strong> {user.hair}</Text>
      <Text><strong>Eye Color:</strong> {user.eyes}</Text>
      <Text><strong>Roles:</strong> {user.roles.join(', ')}</Text>
      <Text><strong>ID:</strong> {user.id}</Text>
    </Flex>

   
    <Image
    mr='sm'
    mt={-40}
      height={200}
      width={150}
      radius="md"
      src={`/uploads/${user.avatar}`}
      alt={`Avatar for ${user.name}`}
    />
  </Flex>
     
    </Modal>
  );
};

export default UserInfoModal;