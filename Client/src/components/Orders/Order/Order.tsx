import { useState, ChangeEvent, useEffect } from "react";
import OrderInterface from "../../../utilis/interface/Orders.interface";
import classes from "./Order.module.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { OrderItem } from "../../../utilis/interface/Orders.interface";
import {
  deleteOrder,
  updateOrder,
} from "../../../utilis/actions/orderActions.api";

import { retrieveCustomer } from "../../../utilis/actions/customerActions.api";

interface OrderProps {
  OrderInfo: OrderInterface;
  getData: () => void;
}

const Order = ({ OrderInfo, getData }: OrderProps) => {
  const {
    id,
    order_number,
    creation_date,
    last_update_date,
    comments,
    customer,
    products,
  } = OrderInfo;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);
  const [cstmerName, setCstmrName] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    comments: string;
    products: OrderItem[];
  }>({ comments: comments, products: [...products] });

  useEffect(() => {
    const getName = async () => {
      const data = await retrieveCustomer(token, customer);
      if (data?.fullName) setCstmrName(data?.fullName);
    };
    if (!cstmerName) getName();
  }, [cstmerName]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const deleteHandler = async () => {
    await deleteOrder(token, id);
    return getData();
  };
  const onSaveHandler = async () => {
    await updateOrder(token, id, details.comments, details.products);
    setIsEdit(false);
    getData();
  };

  const decreaseHandler = (index: number) => {
    setDetails((prevState) => {
      const newProducts = [...prevState.products];
      if (newProducts[index].quantity > 1) {
        newProducts[index].quantity -= 1;
      }
      return { ...prevState, products: newProducts };
    });
  };

  const increaseHandler = (index: number) => {
    setDetails((prevState) => {
      const newProducts = [...prevState.products];
      newProducts[index].quantity += 1;
      return { ...prevState, products: newProducts };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: 600,
          height: 300,
        },
      }}
    >
      <Paper elevation={3}>
        <div className={classes.__order}>
          <div className={classes.__orderInfo}>
            <span>{`Order#: ${order_number}`}</span>
            <span>{`Customer: ${cstmerName}`}</span>
          </div>
          <div className={classes.__orderDates}>
            <span>{`Created: ${creation_date}`}</span>
            <span>{`Last Update: ${last_update_date}`}</span>
          </div>
          <div className={classes.__orderProducts}>
            {details.products.map((product, index) => (
              <div className={classes.__product} key={product.product.id}>
                <span>{`Name: ${product.product.prodName}`}</span>
                {!isEdit ? (
                  <span>{`${product.quantity}`}</span>
                ) : (
                  <div style={{ display: "flex", gap: "2px" }}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        decreaseHandler(index);
                      }}
                    >
                      -
                    </span>
                    <span>{`${product.quantity}`}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        increaseHandler(index);
                      }}
                    >
                      +
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {isEdit ? (
            <input
              type="text"
              name="comments"
              value={details.comments}
              onChange={handleChange}
            />
          ) : (
            <span>{`Comments: ${comments}`}</span>
          )}

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

export default Order;
