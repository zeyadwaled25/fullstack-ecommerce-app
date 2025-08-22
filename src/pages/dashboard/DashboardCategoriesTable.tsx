import {
  Box, Button, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Heading,
  useColorModeValue, Tfoot, TableCaption, Center
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useGetDashboardCategoriesQuery, useDeleteDashboardCategoryMutation } from "../../app/services/apiSlice";
import type { ICategory } from "../../interfaces";
import DashboardCategoriesSkeleton from "../../components/DashboardCategoriesSkeleton";

const DashboardCategoriesTable = () => {
  const { data, isLoading, error } = useGetDashboardCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteDashboardCategoryMutation();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (isLoading) return <DashboardCategoriesSkeleton />;
  if (error) return <Center>Error loading categories</Center>;

  const categories = data?.data || [];

  return (
    <Box>
      <HStack maxW="95%" mx="auto" justify="space-between" mb={6}>
        <Heading size="lg">Categories</Heading>
        <Button colorScheme="teal">+ Add Category</Button>
      </HStack>

      <TableContainer
        maxW="95%"
        mx="auto"
        border="1px"
        borderColor={borderColor}
        borderRadius={6}
        overflowX="auto"
      >
        <Table variant="simple">
          <TableCaption my={2}>
            {isLoading ? "Loading..." : `Total Entries: ${categories.length}`}
          </TableCaption>
          <Thead bg="gray.200" _dark={{ bg: "gray.700" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((cat: ICategory, idx: number) => (
              <Tr key={cat.id}>
                <Td>{idx + 1}</Td>
                <Td>{cat.title}</Td>
                <Td>
                  <HStack>
                    <Button size="sm" leftIcon={<EditIcon />} colorScheme="blue">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot bg="gray.200" _dark={{ bg: "gray.700" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardCategoriesTable;