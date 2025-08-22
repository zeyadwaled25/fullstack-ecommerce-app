import { 
  Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, 
  HStack, Button, useDisclosure, 
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import DashboardProductsTableSkeleton from "./DashboardProductsTableSkeleton";
import { 
  useDeleteDashboardProductsMutation, 
  useGetDashboardProductsQuery, 
  useUpdateDashboardProductsMutation,
  useAddDashboardProductMutation
} from "../app/services/apiSlice";
import type { IProduct } from "../interfaces";
import CustomAlertDialog from "../shared/AlertDialog";
import CustomModal from "../shared/Modal";

const DashboardProductsTable = () => {
  const [selectedDid, setSelectedDid] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct>({
    id: 0,
    documentId: "",
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: { title: "" },
    thumbnail: { url: "" },
    quantity: 0
  });

  // --- Modals ---
  const { isOpen, onOpen, onClose } = useDisclosure() // Delete
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure() // Edit
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure() // Add

  const { isLoading, data, error } = useGetDashboardProductsQuery(undefined);
  const [destroyProduct, {isLoading: isDestroying, isSuccess: isDestroySuccess}] = useDeleteDashboardProductsMutation();
  const [updateProduct, {isLoading: isUpdating, isSuccess: isUpdateSuccess}] = useUpdateDashboardProductsMutation();
  const [addProduct, {isLoading: isAdding, isSuccess: isAddSuccess}] = useAddDashboardProductMutation();

  const initialRef = useRef(null)
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // --- Handlers ---
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setProductToEdit(prev => ({ ...prev, [name]: value }));
  }
  const onChangePriceHandler = (valueAsString: string, valueAsNumber: number) => {
    setProductToEdit(prev => ({ ...prev, price: valueAsNumber }));
  }
  const onChangeStockHandler = (valueAsString: string, valueAsNumber: number) => {
    setProductToEdit(prev => ({ ...prev, stock: valueAsNumber }));
  }
  const onChangeThumbnailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setThumbnail(e.target.files[0]);
  }

  const resetForm = () => {
    setThumbnail(null);
    setProductToEdit({
      id: 0,
      documentId: "",
      title: "",
      description: "",
      price: 0,
      stock: 0,
      category: { title: "" },
      thumbnail: { url: "" },
      quantity: 0
    });
  }

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append("data[title]", productToEdit.title);
    formData.append("data[description]", productToEdit.description);
    formData.append("data[price]", productToEdit.price.toString());
    formData.append("data[stock]", productToEdit.stock.toString());
    if (thumbnail) formData.append("files.thumbnail", thumbnail);

    if (productToEdit.documentId) {
      // Update
      updateProduct({ documentId: productToEdit.documentId, body: formData });
    } else {
      // Add
      addProduct(formData);
    }
  }

  const handleModalClose = () => {
    resetForm();
    onModalClose();
  }
  const handleAddClose = () => {
    resetForm();
    onAddClose();
  }

  useEffect(() => {
    if (isDestroySuccess) {
      setSelectedDid('')
      onClose()
    }
    if (isUpdateSuccess) handleModalClose()
    if (isAddSuccess) handleAddClose()
  }, [isDestroySuccess, isUpdateSuccess, isAddSuccess])

  if (isLoading) return <DashboardProductsTableSkeleton />;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <HStack maxW="95%" mx="auto" justify="space-between" mb={6}>
        <Heading size="lg">Products</Heading>
        <Button colorScheme="teal" onClick={() => {
          resetForm();
          onAddOpen();
        }}>+ Add Product</Button>
      </HStack>

      {/* Table */}
      <TableContainer maxW="95%" mx="auto" border="1px" borderColor={borderColor} borderRadius={6} overflowX="auto">
        <Table variant="simple" colorScheme='gray'>
          <TableCaption my={2}>Total Entries: {data?.data?.length ?? 0}</TableCaption>
          <Thead bg="gray.200" _dark={{ bg: "gray.700" }}>
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
              <Tr key={product.id} _hover={{ bg: borderColor }} cursor="pointer">
                <Td>{idx + 1}</Td>
                <Td>
                  <Image src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`} alt={product.title} boxSize="50px" objectFit="cover" borderRadius="md" />
                </Td>
                <Td>{product.title}</Td>
                <Td isNumeric>${product.price}</Td>
                <Td>{product.category.title}</Td>
                <Td isNumeric>{product.stock}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="blue" variant="outline">View</Button>
                    <Button size="sm" colorScheme="yellow" variant="outline"
                      onClick={() => {
                        setSelectedDid(product.documentId)
                        setProductToEdit(product)
                        onModalOpen()
                      }}>Edit</Button>
                    <Button size="sm" colorScheme="red" variant="outline"
                      onClick={() => { setSelectedDid(product.documentId); onOpen() }}>Delete</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot bg="gray.200" _dark={{ bg: "gray.700" }} borderBottom="1px" borderColor={borderColor}>
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

      {/* Alert Dialog */}
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Are You Sure?"
        description="Do you really want to destroy this product? This action cannot be undone."
        onOkHandler={(id) => destroyProduct(id)}
        deleteId={selectedDid}
        isLoading={isDestroying}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        isOpen={isModalOpen || isAddOpen}
        onClose={isModalOpen ? handleModalClose : handleAddClose}
        title={isModalOpen ? "Update Product" : "Add Product"}
        okTxt={isModalOpen ? "Update" : "Add"}
        initialRef={initialRef}
        onOkClick={onSubmitHandler}
        isLoading={isUpdating || isAdding}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            ref={initialRef}
            placeholder='Product Title...'
            value={productToEdit.title}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder='Product Description...'
            value={productToEdit.description}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToEdit.price}
            precision={2}
            step={0.2}
            onChange={onChangePriceHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            name="stock"
            defaultValue={productToEdit.stock}
            min={0}
            step={1}
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file" 
            name="thumbnail"
            accept="image/*"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
