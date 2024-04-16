import { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getAllCustomers } from "../../../utilis/actions/customerActions.api";
import { getAllProducts } from "../../../utilis/actions/productActions.api";
import { createOrder } from "../../../utilis/actions/orderActions.api";
import {
  dataIntreface,
  infoInterface,
  prodInterface,
} from "../../../utilis/interface/NewOrder.interface";
import classes from "./Order.module.scss";
interface NewOrderProps {
  getData: () => void;
}

export const NewOrder = ({ getData }: NewOrderProps) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [info, setInfo] = useState<infoInterface | null>(null);
  const [data, setData] = useState<dataIntreface>({
    customer: 0,
    comments: "",
    products: [],
  });
  const [prod, setProd] = useState<prodInterface>({ id: 0, quantity: 0 });
  useEffect(() => {
    const getInfo = async () => {
      const [allProds, allCstmrs] = await Promise.all([
        getAllProducts(token),
        getAllCustomers(token),
      ]);
      setInfo({ customers: allCstmrs, products: allProds });
      const x = false;
      if (x) getInfo();
    };
    getInfo();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "id" || name === "quantity")
      return setProd({ ...prod, [name]: value });
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = () => {
    const newProducts = [...data.products, prod];
    setData((prev) => ({ ...prev, products: newProducts }));
    setProd({ id: 0, quantity: 0 });
  };

  const addNewOrder = async () => {
    await createOrder(token, data);
    getData();
  };

  if (!info) return <h2>Fethcing data...</h2>;
  return (
    <div className={classes.__newOrder}>
      <div className={classes.__customer}>
        <label htmlFor="">Customer: </label>
        <select name="customer" value={data.customer} onChange={handleChange}>
          <option value="" disabled>
            Choose...
          </option>
          {info.customers.map((customer) => (
            <option value={customer.id} key={customer.id}>
              {customer.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.__products}>
        <label htmlFor="">Products</label>
        <div className={classes.__inputs}>
          {" "}
          <select name="id" value={prod.id} onChange={handleChange}>
            <option value="" disabled>
              Choose...
            </option>
            {info.products.map((product) => (
              <option value={product.id} key={product.id}>
                {product.prodName}
              </option>
            ))}
          </select>
          <input
            value={prod.quantity}
            type="number"
            name="quantity"
            onChange={handleChange}
          />
          <button onClick={addProduct}>Add product</button>
        </div>
      </div>
      <div>
        <textarea
          name="comments"
          id=""
          cols={40}
          rows={5}
          onChange={handleChange}
        ></textarea>
      </div>
      <button onClick={addNewOrder}>Submit Order</button>
    </div>
  );
};
