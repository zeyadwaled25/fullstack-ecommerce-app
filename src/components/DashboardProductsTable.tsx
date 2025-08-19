import { 
  Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, 
  HStack, Button, useDisclosure 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashboardProductsTableSkeleton from "./DashboardProductsTableSkeleton";
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from "../app/services/apiSlice";
import type { IProduct } from "../interfaces";
import CustomAlertDialog from "../shared/AlertDialog";

const DashboardProductsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, data, error } = useGetDashboardProductsQuery(undefined);
  const [destroyProduct, {isLoading: isDestroying, isSuccess}] = useDeleteDashboardProductsMutation();
  const [selectedDid, setSelectedDid] = useState<string>("");

  useEffect(() => {
    setSelectedDid('')
    onClose()
  }, [isSuccess])

  if (isLoading) return <DashboardProductsTableSkeleton />;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <TableContainer maxW={'85%'} mx={'auto'}>
        <Table variant="simple">
          <TableCaption>Total Entries: {data?.data?.length ?? 0}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Thumbnail</Th>
              <Th>Title</Th>
              <Th isNumeric>Price</Th>
              <Th>Category</Th>
              <Th isNumeric>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product: IProduct, idx: number) => (
              <Tr key={product.id}>
                <Td>{idx}</Td>
                <Td>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                    alt={product.title} 
                    boxSize="50px" 
                    objectFit="cover" 
                    borderRadius="md" 
                  />
                </Td>
                <Td>{product.title}</Td>
                <Td isNumeric>${product.price}</Td>
                <Td>{product.category.title}</Td>
                <Td isNumeric>{product.stock}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="blue" variant="outline">
                      View
                    </Button>
                    <Button size="sm" colorScheme="yellow" variant="outline">
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      variant="outline"
                      onClick={() => {
                        setSelectedDid(product.documentId)
                        onOpen()
                      }}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Thumbnail</Th>
              <Th>Title</Th>
              <Th isNumeric>Price</Th>
              <Th>Category</Th>
              <Th isNumeric>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Are You Sure?"
        description="Do you really want to destroy this product? This action cannot be undone."
        onOkHandler={(id) => destroyProduct(id)}
        deleteId={selectedDid}
        isLoading={isDestroying}
      />
    </>
  );
};

export default DashboardProductsTable;
