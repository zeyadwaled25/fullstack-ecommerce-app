import {
  Box, Button, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Heading,
  useColorModeValue, Tfoot, TableCaption, Center, Input
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import CustomModal from "../shared/Modal";
import CustomAlertDialog from "../shared/AlertDialog";
import {
  useGetDashboardCategoriesQuery,
  useAddDashboardCategoryMutation,
  useUpdateDashboardCategoryMutation,
  useDeleteDashboardCategoryMutation
} from "../app/services/apiSlice";
import type { ICategory } from "../interfaces";
import DashboardCategoriesTableSkeleton from "./DashboardCategoriesTableSkeleton";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

const DashboardCategoriesTable = () => {
  const {isOnline} = useSelector(selectNetwork);
  const { data, isLoading, error } = useGetDashboardCategoriesQuery(undefined);
  const [addCategory] = useAddDashboardCategoryMutation();
  const [updateCategory] = useUpdateDashboardCategoryMutation();
  const [deleteCategory] = useDeleteDashboardCategoryMutation();

  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [editCat, setEditCat] = useState<ICategory | null>(null);
  const [deleteId, setDeleteId] = useState("");

  const addRef = useRef(null);
  const editRef = useRef(null);

  if (isLoading || !isOnline) return <DashboardCategoriesTableSkeleton />;
  if (error) return <Center>Error loading categories</Center>;

  const categories = data?.data || [];

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await addCategory({ data: { title: newName } }).unwrap();
      setAddOpen(false);
      setNewName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    if (!editCat?.title.trim()) return;
    try {
      await updateCategory({
        documentId: editCat.documentId!,
        body: { data: { title: editCat.title } }
      }).unwrap();
      setEditOpen(false);
      setEditCat(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      setDelOpen(false);
      setDeleteId("");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Box>
      <HStack maxW="95%" mx="auto" justify="space-between" mb={6}>
        <Heading size="lg">Categories</Heading>
        <Button colorScheme="teal" onClick={() => setAddOpen(true)}>+ Add Category</Button>
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
            Total Entries: {categories.length}
          </TableCaption>
          <Thead bg="gray.200" _dark={{ bg: "gray.700" }}>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Items</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {categories.map((cat: ICategory, idx: number) => (
              <Tr key={cat.id}>
                <Td>{idx + 1}</Td>
                <Td>{cat.title}</Td>
                <Td>{cat.products?.length ?? 0}</Td>
                <Td>
                  <HStack>
                    <Button
                      size="sm"
                      leftIcon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => { setEditCat(cat); setEditOpen(true); }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => { setDeleteId(cat.documentId!); setDelOpen(true); }}
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
              <Th>Items</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* Add Modal */}
      <CustomModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Category"
        initialRef={addRef}
        onOkClick={handleAdd}
        isLoading={false}
      >
        <Input
          ref={addRef}
          placeholder="Category Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Category"
        initialRef={editRef}
        onOkClick={handleEdit}
        isLoading={false}
      >
        <Input
          ref={editRef}
          value={editCat?.title ?? ""}
          onChange={e => setEditCat({ ...editCat!, title: e.target.value })}
        />
      </CustomModal>

      {/* Delete Dialog */}
      <CustomAlertDialog
        isOpen={delOpen}
        onClose={() => setDelOpen(false)}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        deleteId={deleteId}
        onOkHandler={handleDelete}
        isLoading={false}
      />
    </Box>
  );
};

export default DashboardCategoriesTable;