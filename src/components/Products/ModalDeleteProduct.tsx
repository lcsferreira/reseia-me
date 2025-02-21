import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ModalContainer } from "../ModalContainer";
import { Product } from "../../models/Product";

interface ModalDeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  selectedProduct?: Product;
}

export const ModalDeleteProduct = ({
  isOpen,
  onClose,
  handleDelete,
  selectedProduct,
}: ModalDeleteProductProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} width="xs">
      <DialogTitle>Deletar {selectedProduct?.product_name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Tem certeza que deseja deletar este produto? Essa ação não poderá ser
          desfeita.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Deletar
        </Button>
      </DialogActions>
    </ModalContainer>
  );
};
