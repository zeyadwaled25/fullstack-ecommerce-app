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
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import DashboardProductsTableSkeleton from "./DashboardProductsTableSkeleton";
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery, useUpdateDashboardProductsMutation } from "../app/services/apiSlice";
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
    category: {
      title: ""
    },
    thumbnail: {
      url: ""
    },
    quantity: 0
  });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { isLoading, data, error } = useGetDashboardProductsQuery(undefined);
  const [destroyProduct, {isLoading: isDestroying, isSuccess}] = useDeleteDashboardProductsMutation();
  const [updateProduct, {isLoading: isUpdating, isSuccess: isUpdatingSuccess}] = useUpdateDashboardProductsMutation();
  const initialRef = useRef(null)

  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Handler
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target

    setProductToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const onChangePriceHandler = (valueAsString: string, valueAsNumber: number) => {
    setProductToEdit((prev) => ({
      ...prev,
      price: valueAsNumber,
    }));
  }
  const onChangeStockHandler = (valueAsString: string, valueAsNumber: number) => {
    setProductToEdit((prev) => ({
      ...prev,
      stock: valueAsNumber,
    }));
  }
  const onChangeThumbnailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
    }
  }
  const onSubmitHandler = () => {
    const formData = new FormData();

    formData.append("data[title]", productToEdit.title);
    formData.append("data[description]", productToEdit.description);
    formData.append("data[price]", (productToEdit.price ?? 0).toString());
    formData.append("data[stock]", (productToEdit.stock ?? 0).toString());

    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }

    updateProduct({ documentId: selectedDid, body: formData });
  }

  const handleModalClose = () => {
    setThumbnail(null);
    setProductToEdit({
      id: 0,
      documentId: "",
      title: "",
      description: "",
      price: 0,
      stock: 0,
      category: {
        title: ""
      },
      thumbnail: {
        url: ""
      },
      quantity: 0
    });
    onModalClose();
  }

  useEffect(() => {
    if (isSuccess) {
      setSelectedDid('')
      onClose()
    }
    if (isUpdatingSuccess) {
      setSelectedDid('')
      onModalClose()
    }
  }, [isSuccess, isUpdatingSuccess])

  if (isLoading) return <DashboardProductsTableSkeleton />;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <TableContainer
        maxW={'85%'}
        mx={'auto'}
        border="1px"
        borderColor={borderColor}
        borderRadius={5}
      >
        <Table variant="simple">
          <TableCaption my={2}>Total Entries: {data?.data?.length ?? 0}</TableCaption>
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
                    <Button size="sm" colorScheme="yellow" variant="outline"
                      onClick={() => {
                        setSelectedDid(product.documentId)
                        setProductToEdit(product)
                        onModalOpen()
                      }}
                    >
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
      {/* Edit Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Update Product"
        okTxt="Update"
        initialRef={initialRef}
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
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
