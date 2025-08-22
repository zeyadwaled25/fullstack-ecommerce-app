import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";

const DashboardProductsTableSkeleton = () => {
  return (
    <Stack maxW="85%" mx="auto" my={10}>
      <Box display="flex" justifyContent="space-between" mb={6}>
        <Skeleton height="35px" width="120px" borderRadius="md" />
        <Skeleton height="35px" width="150px" borderRadius="md" />
      </Box>

      {Array.from({ length: 10 }).map((_, idx) => (
        <Flex
          key={idx}
          alignItems="center"
          justifyContent="space-between"
          border="1px solid #999"
          height="50px"
          rounded="md"
          p={5}
        >
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Skeleton h="9px" w="120px" bg="gray" />
          <Flex>
            <Skeleton h="30px" w="150px" startColor="red.300" endColor="red.500" mr={4} />
            <Skeleton h="30px" w="150px" startColor="blue.300" endColor="blue.500" />
          </Flex>
        </Flex >
      ))}
      <Box>
        <Skeleton h="15px" w="300px" bg={'gray'} mx={'auto'} mt={5} />
      </Box>
    </Stack>
  );
};

export default DashboardProductsTableSkeleton;