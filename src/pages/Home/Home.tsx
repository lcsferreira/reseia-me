import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"; // Para gráficos
// import ProductTable from "./components/ProductTable"; // Componente de tabela de produtos (exemplo)

// Dados de exemplo para o gráfico
const data = [
  { name: "Descritivos Aprovados", value: 75 },
  { name: "Descritivos Pendentes", value: 15 },
  { name: "Descritivos Rejeitados", value: 10 },
];

const recentProductsMocked = [
  {
    id: 1,
    name: "Produto 1",
    description: "Descrição do produto 1",
    category: "Categoria 1",
  },
  {
    id: 2,
    name: "Produto 2",
    description: "Descrição do produto 2",
    category: "Categoria 2",
  },
  {
    id: 3,
    name: "Produto 3",
    description: "Descrição do produto 3",
    category: "Categoria 3",
  },
];

const summaryDescriptiveStatus = [
  {
    status: "Aprovado",
    quantity: 75,
  },
  {
    status: "Pendente",
    quantity: 15,
  },
  {
    status: "Rejeitado",
    quantity: 10,
  },
];

const Home: React.FC = () => {
  const colors = ["#17bebb", "#6a0572", "#ff6961"];
  const maxItensOnTable = 5;

  const recentProducts = recentProductsMocked.slice(0, maxItensOnTable);

  return (
    <Container
      sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard de Descritivos de Produtos
      </Typography>

      {/* Grid para os cards de métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            <Typography variant="h6">Total de Produtos</Typography>
            <Typography variant="h4">100</Typography>
          </Paper>
        </Grid>
        {summaryDescriptiveStatus.map((item, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: colors[index],
                color: "white",
              }}
            >
              <Typography variant="h6">{item.status}</Typography>
              <Typography variant="h4">{item.quantity}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={2}>
        {/* Gráfico de pizza */}
        <Paper sx={{ p: 2, mb: 4, width: "100%", height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Status dos Descritivos
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Tabela de produtos recentes */}
        <Paper sx={{ p: 2, width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" gutterBottom>
              Produtos Recentes
            </Typography>
            <Typography
              variant="button"
              sx={{
                alignSelf: "flex-end",
                color: "primary.main",
                textDecoration: "underline",
              }}
            >
              Ver todos
            </Typography>
          </Box>
          {/* Exemplo de componente de tabela */}
          <Table>
            <TableHead>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categoria</TableCell>
            </TableHead>
            <TableBody>
              <>
                {recentProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
