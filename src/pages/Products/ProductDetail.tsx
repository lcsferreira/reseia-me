import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../textEditorStyle.css";
import { Product } from "../../models/Product";
import { getProductById } from "../../api/services/products";
import { useParams } from "react-router-dom";
import { ArrowBack, AutoFixHigh, Edit, Save } from "@mui/icons-material";

export const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState<string>("");
  const [descLoading, setDescLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onEditorStateChange = function (editorState: EditorState) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    /*let text = blocks.reduce((acc, item) => {
      acc = acc + item.text;
      return acc;
    }, "");*/
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    setText(text);
  };

  useEffect(() => {
    if (productDetail?.description_generated) {
      try {
        let contentState;
        setDescLoading(true);

        if (typeof productDetail.description_generated === "string") {
          // Se for apenas texto, cria um ContentState simples
          contentState = ContentState.createFromText(
            productDetail.description_generated
          );
        } else {
          // Se for um objeto Draft.js, usa convertFromRaw normalmente
          contentState = convertFromRaw(productDetail.description_generated);
        }

        setEditorState(EditorState.createWithContent(contentState));
        setDescLoading(false);
      } catch (error) {
        console.error("Erro ao converter descrição:", error);
      }
    }
  }, [productDetail]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProductById(Number(id));
      if (data) {
        setProductDetail(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setEditedProduct(productDetail);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedProduct) return;
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleClose();
  };

  return (
    <Container
      sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h1">
        <IconButton
          onClick={() => window.history.back()}
          color="secondary"
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        Detalhes do Produto
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            m: 2,
            p: 2,
            boxShadow: 3,
            borderRadius: 3,
            width: "100%",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {loading ? (
                  <Skeleton variant="text" width={200} height={40} />
                ) : (
                  productDetail?.product_name
                )}
              </Typography>
              <IconButton
                onClick={handleOpen}
                color="primary"
                disabled={loading}
              >
                <Edit />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Loja:{" "}
              {loading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                productDetail?.store_name
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categoria:{" "}
              {loading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                productDetail?.category
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Criado em:{" "}
              {loading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                new Date(productDetail?.created_at || "").toLocaleDateString()
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Atualizado em:{" "}
              {loading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                new Date(productDetail?.updated_at || "").toLocaleDateString()
              )}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<AutoFixHigh />}
              onClick={() => console.log("Gerar descrição")}
              sx={{ mt: 1 }}
              disabled={descLoading || loading}
            >
              Gerar Descrição
            </Button>
          </CardContent>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Nome do Produto"
                name="product_name"
                fullWidth
                value={editedProduct?.product_name || ""}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Loja"
                name="store_name"
                fullWidth
                value={editedProduct?.store_name || ""}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Categoria"
                name="category"
                fullWidth
                value={editedProduct?.category || ""}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                color="secondary"
                variant="contained"
                startIcon={<Save />}
              >
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        </Card>

        <Card
          sx={{
            maxWidth: 600,
            m: 2,
            p: 2,
            boxShadow: 3,
            borderRadius: 3,
            width: "100%",
          }}
        >
          <CardContent>
            <Typography variant="h6">Descrição Gerada</Typography>
            {descLoading ? (
              <Skeleton variant="text" width={200} height={40} />
            ) : (
              productDetail?.description_generated && (
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  localization={{
                    locale: "pt",
                  }}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              )
            )}
            {!productDetail?.description_generated && (
              <Typography variant="body1">
                Nenhuma descrição disponível.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};
