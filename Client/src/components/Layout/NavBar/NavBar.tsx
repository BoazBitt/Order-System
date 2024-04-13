import classes from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserAction } from "../../../store/slice/user.slice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  return (
    <header className={classes.__headerContainer}>
      <div className={classes.__title}>
        <span>Order System</span>
      </div>
      <div className={classes.__links}>
        <Link className={classes.__link} to={"/main"}>
          Home
        </Link>
      </div>
      <div className={classes.__user}>
        {user.isAuth ? (
          <>
            <span>
              Hello {user.first_name} {user.last_name}
            </span>
            <button
              onClick={() => {
                dispatch(UserAction.logout());
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default NavBar;
