import { useState } from "react";
import classes from "./MainPage.module.scss";
import Products from "../../components/Products/Products";
import Customers from "../../components/Customers/Customers";
import Orders from "../../components/Orders/Orders";
type OPTIONS = "Products" | "Customers" | "Orders" | null;
const MainPage = () => {
  const [options, setOptions] = useState<OPTIONS>(null);

  const onClickHandler = (opt: OPTIONS) => {
    if (options == opt) return setOptions(null);
    setOptions(opt);
  };
  return (
    <div className={classes.__mainpage}>
      <div className={classes.__btn}>
        <button
          onClick={() => {
            onClickHandler("Products");
          }}
        >
          Products
        </button>
        <button
          onClick={() => {
            onClickHandler("Customers");
          }}
        >
          Customers
        </button>
        <button
          onClick={() => {
            onClickHandler("Orders");
          }}
        >
          Orders
        </button>
      </div>
      <div className={classes.__contnet}>
        <h1>{options ? options : ""}</h1>

        {options === "Products" && <Products />}
        {options === "Customers" && <Customers />}
        {options === "Orders" && <Orders />}
      </div>
    </div>
  );
};

export default MainPage;
