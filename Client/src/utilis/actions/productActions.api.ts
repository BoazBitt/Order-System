/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HEADERS, PATH_SERVER } from "./APIEndpoint";
import ProductInterface from "../interface/Product.interface";
import { newProductInterface } from "../../components/Products/Product/NewProduct";

const route = `product`;

interface PagedProducts {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductInterface[];
}
export const getProducts = async (
  token: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedProducts | null> => {
  try {
    const { data } = await axios.get(`${PATH_SERVER}/${route}/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
      params: { page, page_size: pageSize },
    });
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const deleteProduct = async (
  token: string,
  id: number
): Promise<any> => {
  try {
    const response = await axios.delete(`${PATH_SERVER}/${route}/${id}/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });
    if (response.status === 204) return "Product deleted successfully";
    throw new Error();
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const createProduct = async (
  token: string,
  details: newProductInterface
): Promise<any> => {
  try {
    const response = await axios.post(`${PATH_SERVER}/${route}/`, details, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });

    if (response.status === 201) return "Product created successfully";
    throw new Error("Product creation failed");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updateProduct = async (
  token: string,
  id: number,
  price: string,
  type: string
): Promise<any> => {
  try {
    const response = await axios.put(
      `${PATH_SERVER}/${route}/${id}/`,
      { price, type },
      {
        headers: { ...HEADERS, Authorization: `Token ${token}` },
      }
    );

    if (response.status === 201) return "Product updated successfully";
    throw new Error("Product creation failed");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getAllProducts = async (
  token: string
): Promise<ProductInterface[]> => {
  try {
    const { data } = await axios.get(`${PATH_SERVER}/${route}/all/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
