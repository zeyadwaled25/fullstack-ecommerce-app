import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  useColorModeValue,
  Tfoot,
  TableCaption,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const DashboardCategoriesTable = () => {
  const categories = [
    { id: 1, name: "Electronics", description: "Phones, Laptops, Accessories" },
    { id: 2, name: "Fashion", description: "Clothes, Shoes, Watches" },
    { id: 3, name: "Groceries", description: "Food, Drinks, Household items" },
  ];

  return (
    <Box>
      <HStack
        maxW="95%"
        mx="auto"
        justify="space-between"
        mb={6}
      >
        <Heading size="lg">Categories</Heading>
        <Button colorScheme="teal">+ Add Category</Button>
      </HStack>

      <TableContainer
        maxW="95%"
        mx="auto"
        border="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderRadius={6}
        overflowX="auto"
      >
        <Table variant="simple">
          <TableCaption my={2}>Total Entries: {categories.length}</TableCaption>
          <Thead bg="gray.200" _dark={{ bg: "gray.700" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((cat) => (
              <Tr key={cat.id}>
                <Td>{cat.id}</Td>
                <Td>{cat.name}</Td>
                <Td>{cat.description}</Td>
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
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot
            bg="gray.200" _dark={{ bg: "gray.700" }}
            borderBottom="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardCategoriesTable;
