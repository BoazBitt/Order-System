import classes from "./Orders.module.scss";
import { useState, useEffect } from "react";
import OrderInterface from "../../utilis/interface/Orders.interface";
import { getOrders } from "../../utilis/actions/orderActions.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Order from "./Order/Order";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Orders = () => {
  const [orders, setOrders] = useState<OrderInterface[] | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  // const [newOrder, setNewOrder] = useState<boolean>(false);

  const getData = async (page: number) => {
    const data = await getOrders(user.token, page);
    if (data) {
      // setNewOrder(false);
      setOrders(data.results);
      setHasNextPage(data.next != null);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className={classes.__products}>
      {/* <div className={classes.__newProduct}>
        {" "}
        <button
          onClick={() => {
            setNewProduct((prev) => !prev);
          }}
        >
          {newProduct ? "Cancel" : "Add New Product"}
        </button>
        {newProduct && <NewProduct getData={() => getData(currentPage)} />}
      </div>{" "} */}
      <Grid sx={{ flexGrow: 1 }} container justifyContent="center">
        <Grid item xs={10} sx={{ margin: "auto" }}>
          <Grid container justifyContent="center" spacing={2}>
            {orders &&
              orders.map((order) => (
                <Grid key={order.id} item>
                  <Order
                    OrderInfo={order}
                    getData={() => getData(currentPage)}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.__togglePages}>
        {" "}
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{currentPage}</span>
        <Button onClick={handleNext} disabled={!hasNextPage}>
          Next
        </Button>{" "}
      </div>
    </div>
  );
};

export default Orders;
