import axios from "axios";
import { MockedProductsData } from "../../mock/Products";
import { Product } from "../../models/Product";
import { mock } from "../api";

export const getProducts = async (): Promise<Product[]> => {
  mock.onGet("/products").reply(200, {
    MockedProductsData,
  });
  const response = await axios.get("/products");
  return response.data.MockedProductsData;
};

export const getProductById = async (id: number): Promise<Product> => {
  const product = MockedProductsData.find((product) => product.id === id);

  mock.onGet(`/products/${id}`).reply(200, {
    product,
  });
  const response = await axios.get(`/products/${id}`);
  return response.data.product;
};

// export const getProducts = async (): Promise<Product[]> => {
//   const mock = new MockAdapter(axios);
//   mock.onGet("/products").reply(200, [
//     { id: 1, product_name: "Product 1", description_generated: true, store_name: "Store 1", category: "Category 1" },
//     { id: 2, product_name: "Product 2", description_generated: false, store_name: "Store 2", category: "Category 2" },
//   ]);
//   const response = await axios.get("/products");
//   return response.data;
// };
