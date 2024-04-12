/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HEADERS, PATH_SERVER } from "./APIEndpoint";
import OrderInterface, { OrderItem } from "../interface/Orders.interface";

const route = `orders`;

interface PagedOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderInterface[];
}

export const getOrders = async (
  token: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedOrders | null> => {
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

export const deleteOrder = async (token: string, id: number): Promise<any> => {
  try {
    const response = await axios.delete(`${PATH_SERVER}/${route}/${id}/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });
    if (response.status === 204) return "Customer deleted successfully";
    throw new Error();
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const updateOrder = async (
  token: string,
  id: number,
  comments: string,
  products: OrderItem[]
): Promise<any> => {
  try {
    const response = await axios.put(
      `${PATH_SERVER}/${route}/${id}/`,
      { comments, products },
      {
        headers: { ...HEADERS, Authorization: `Token ${token}` },
      }
    );

    if (response.status === 201) return "Customer created successfully";
    throw new Error("Customer creation failed");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
