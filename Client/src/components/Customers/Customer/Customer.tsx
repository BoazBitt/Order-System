import { useSelector } from "react-redux";
import CustomerInterface from "../../../utilis/interface/Customer.interface";
import classes from "./Customer.module.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { RootState } from "../../../store/store";
import {
  deleteCustomer,
  updateCustomer,
} from "../../../utilis/actions/customerActions.api";
import { ChangeEvent, useState } from "react";

interface ProductProps {
  CustomerInfo: CustomerInterface;
  getData: () => void;
}
const Customer = ({ CustomerInfo, getData }: ProductProps) => {
  const { id, fullName, email, phone } = CustomerInfo;
  const [details, setDetails] = useState<{
    fullName: string;
    email: string;
  }>({ fullName: fullName, email: email });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  const onSaveHandler = async () => {
    await updateCustomer(token, id, details.fullName, details.email);
    setIsEdit(false);
    getData();
  };
  const deleteHandler = async () => {
    await deleteCustomer(token, id);
    return getData();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: 250,
          height: 250,
        },
      }}
    >
      <Paper elevation={3}>
        <div className={classes.__customer}>
          <div className={classes.__customerInfo}>
            {!isEdit ? (
              <>
                {" "}
                <span>{`Name: ${fullName}`}</span>
                <span>{`Email: ${email}`}</span>
                <span>{`Phone: ${phone}`}</span>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="fullName"
                  value={details.fullName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  value={details.email}
                  onChange={handleChange}
                />

                <span>{`Phone: ${phone}`}</span>
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

export default Customer;
