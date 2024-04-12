import { useState, ChangeEvent, FormEvent } from "react";
import classes from "./Product.module.scss";
import { createProduct } from "../../../utilis/actions/productActions.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface newProductInterface {
  prodName: string;
  price: string;
  type: "raw" | "dish" | undefined;
}

const INITIAL_PRODUCT_STATE: newProductInterface = {
  prodName: "",
  price: "",
  type: undefined,
};

interface NewProductProps {
  getData: () => void;
}

const NewProduct = ({ getData }: NewProductProps) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [details, setDetails] = useState<newProductInterface>(
    INITIAL_PRODUCT_STATE
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct(token, details);
    getData();
  };

  return (
    <div className={classes.__newproduct}>
      <h2>Add New Product</h2>
      <form className={classes.__form} onSubmit={handleSubmit}>
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          name="prodName"
          value={details.prodName}
          onChange={handleChange}
        />
        <label htmlFor="">Price</label>
        <input
          type="number"
          name="price"
          value={details.price}
          onChange={handleChange}
        />

        <label htmlFor="">Type</label>
        <select name="type" value={details.type || ""} onChange={handleChange}>
          <option value="" disabled>
            Choose...
          </option>
          <option value="raw">Raw</option>
          <option value="dish">Dish</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewProduct;
