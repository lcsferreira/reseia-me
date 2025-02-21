import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ModalDeleteProduct } from "../../components/Products/ModalDeleteProduct";
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { getProducts } from "../../api/services/products";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const Actions = ({
  id,
  handleEdit,
  handleDelete,
}: {
  id: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleEdit(id)}
      >
        <Edit />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => handleDelete(id)}
      >
        <Delete />
      </Button>
    </Box>
  );
};

export const ProductsList = () => {
  const navigator = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setOpenDeleteModal(true);
    setSelectedProduct(products.find((product) => product.id === id) || null);

    console.log("Delete", id);
  };

  const confirmDelete = (productId: number) => {
    setOpenDeleteModal(false);

    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleEdit = (id: number) => {
    navigator(`/products/${id}`);
  };

  return (
    <Container
      sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <ModalDeleteProduct
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        handleDelete={() => confirmDelete(selectedProduct?.id || 0)}
        selectedProduct={selectedProduct!}
      />
      <Typography variant="h1">Lista de produtos</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}
        {!loading && (
          <>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 750 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição gerada</TableCell>
                  <TableCell>Loja</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <TableRow
                        key={product.id}
                        hover
                        style={{ cursor: "pointer", height: 53 }}
                      >
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>
                          {product.description_generated ? "Sim" : "Não"}
                        </TableCell>
                        <TableCell>{product.store_name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <Actions
                            id={product.id}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "Produtos por página",
                    },
                    native: true,
                  },
                }}
                sx={{ width: "100%" }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Table>
          </>
        )}
      </Paper>
    </Container>
  );
};
