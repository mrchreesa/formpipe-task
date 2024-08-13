import { Skeleton, Card } from '@mantine/core';

const SkeletonComponent = () => {
  return (
    <Card radius={'md'} withBorder shadow="sm" w={238}>
    <Skeleton height={50} circle mb="xl" />
    <Skeleton height={8} radius="md" />
    <Skeleton height={8} mt={6} radius="md" />
    <Skeleton height={8} mt={6} mb="xl" width="70%" radius="md" />
  </Card>
  )
}

export default SkeletonComponent