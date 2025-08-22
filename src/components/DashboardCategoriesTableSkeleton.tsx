import {
  Box, Flex, Skeleton, SkeletonText,
} from "@chakra-ui/react";

const DashboardCategoriesTableSkeleton = () => {
  return (
    <Box maxW="95%" mx="auto">
      <Box display="flex" justifyContent="space-between" mb={6}>
        <Skeleton height="35px" width="120px" borderRadius="md" />
        <Skeleton height="35px" width="150px" borderRadius="md" />
      </Box>

      {Array.from({ length: 5 }).map((_, idx) => (
        <Flex key={idx} alignItems="center" justifyContent="space-between" border="1px solid #999" height="50px" rounded="md" p={5}>
          <Skeleton height="18px" width="25px" />
          <Skeleton height="18px" width="120px" />
          <SkeletonText noOfLines={1} width="100px" />
        </Flex>
      ))}
    </Box>
  );
};

export default DashboardCategoriesTableSkeleton;