import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getCustomers } from "../../utilis/actions/customerActions.api";
import classes from "./Customers.module.scss";
import Customer from "./Customer/Customer";
import CustomerInterface from "../../utilis/interface/Customer.interface";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewCustomer from "./Customer/NewCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerInterface[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [newCustomer, setNewCustomer] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const getData = async (page: number) => {
    const data = await getCustomers(user.token, page);
    if (data) {
      setNewCustomer(false);
      setCustomers(data.results);
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
    <div className={classes.__customer}>
      <div className={classes.__newCustomer}>
        {" "}
        <button
          onClick={() => {
            setNewCustomer((prev) => !prev);
          }}
        >
          {newCustomer ? "Cancel" : "Add New Customer"}
        </button>
        {newCustomer && <NewCustomer getData={() => getData(currentPage)} />}
      </div>{" "}
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={10} sx={{ margin: "auto" }}>
          <Grid container justifyContent="center" spacing={2}>
            {customers &&
              customers.map((customer) => (
                <Grid key={customer.id} item>
                  <Customer
                    CustomerInfo={customer}
                    getData={() => getData(currentPage)}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.__togglePages}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{currentPage}</span>
        <Button onClick={handleNext} disabled={!hasNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Customers;
