/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HEADERS, PATH_SERVER } from "./APIEndpoint";
import CusomerInterface from "../interface/Customer.interface";
import { newCustomerInterface } from "../../components/Customers/Customer/NewCustomer";
import CustomerReportInterface from "../interface/CustomerReport.interface";
import { ChartData } from "./functions/serializeReport";

const route = `customer`;

interface PagedCustomers {
  count: number;
  next: string | null;
  previous: string | null;
  results: CusomerInterface[];
}

export const getCustomers = async (
  token: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedCustomers | null> => {
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

export const retrieveCustomer = async (
  token: string,
  id: number
): Promise<ChartData | null> => {
  try {
    const { data } = await axios.get(`${PATH_SERVER}/${route}/${id}/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};
export const getCustomerReport = async (
  token: string,
  id: string
): Promise<CustomerReportInterface | null> => {
  try {
    const { data } = await axios.get(`${PATH_SERVER}/${route}/${id}/report/`, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const deleteCustomer = async (
  token: string,
  id: number
): Promise<any> => {
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

export const createCustomer = async (
  token: string,
  details: newCustomerInterface
): Promise<any> => {
  try {
    const response = await axios.post(`${PATH_SERVER}/${route}/`, details, {
      headers: { ...HEADERS, Authorization: `Token ${token}` },
    });

    if (response.status === 201) return "Customer created successfully";
    throw new Error("Customer creation failed");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updateCustomer = async (
  token: string,
  id: number,
  fullName: string,
  email: string
): Promise<any> => {
  try {
    const response = await axios.put(
      `${PATH_SERVER}/${route}/${id}/`,
      { fullName, email },
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
