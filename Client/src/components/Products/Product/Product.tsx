import { useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../../utilis/actions/productActions.api";
import ProductInterface from "../../../utilis/interface/Product.interface";
import classes from "./Product.module.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { RootState } from "../../../store/store";
import { ChangeEvent, useState } from "react";

interface ProductProps {
  ProductInfo: ProductInterface;
  getData: () => void;
}

const Product = ({ ProductInfo, getData }: ProductProps) => {
  const { id, prodName, price, type } = ProductInfo;
  const [details, setDetails] = useState<{
    price: string;
    type: "dish" | "raw";
  }>({ price: price, type: type });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };
  const onSaveHandler = async () => {
    await updateProduct(token, id, details.price, details.type);
    setIsEdit(false);
    getData();
  };
  const deleteHandler = async () => {
    await deleteProduct(token, id);
    return getData();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: 158,
          height: 158,
        },
      }}
    >
      <Paper elevation={3}>
        <div className={classes.__product}>
          <div className={classes.__productInfo}>
            {!isEdit ? (
              <>
                {" "}
                <span>{`Name: ${prodName}`}</span>
                <span>{`Price: ${price}`}</span>
                <span>{`Type: ${type}`}</span>
              </>
            ) : (
              <>
                <span>{`Name: ${prodName}`}</span>
                <input
                  type="number"
                  name="price"
                  value={details.price}
                  onChange={handleChange}
                />
                <select
                  name="type"
                  value={details.type || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="raw">Raw</option>
                  <option value="dish">Dish</option>
                </select>
              </>
            )}
          </div>

          <div className={classes.__btns}>
            {!isEdit ? (
              <>
                {" "}
                <button onClick={deleteHandler} style={{ background: "red" }}>
                  Delete
                </button>
                <button
                  onClick={() => setIsEdit(true)}
                  style={{ background: "#001F3F" }}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <button style={{ background: "black" }} onClick={onSaveHandler}>
                  Save
                </button>
                <button
                  style={{ background: "black" }}
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default Product;
