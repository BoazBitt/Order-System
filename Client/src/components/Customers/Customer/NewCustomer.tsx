import { useState, ChangeEvent, FormEvent } from "react";
import classes from "./Customer.module.scss";
import { createCustomer } from "../../../utilis/actions/customerActions.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface newCustomerInterface {
  fullName: string;
  email: string;
  phone: string;
}

const INITIAL_CUSTOMER_STATE: newCustomerInterface = {
  fullName: "",
  email: "",
  phone: "",
};

interface NewCustomerProps {
  getData: () => void;
}

const NewCustomer = ({ getData }: NewCustomerProps) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [details, setDetails] = useState<newCustomerInterface>(
    INITIAL_CUSTOMER_STATE
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCustomer(token, details);
    getData();
  };

  return (
    <div className={classes.__newcustomer}>
      <h2>Add New Customer</h2>
      <form className={classes.__form} onSubmit={handleSubmit}>
        <label htmlFor="">Customer Name</label>
        <input
          type="text"
          name="fullName"
          value={details.fullName}
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={details.email}
          onChange={handleChange}
        />

        <label htmlFor="">Phone</label>
        <input
          type="text"
          name="phone"
          value={details.phone}
          onChange={handleChange}
          maxLength={10}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewCustomer;
