import { useState, ChangeEvent } from "react";
import classes from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { UserAction } from "../../store/slice/user.slice";
import { getUser } from "../../utilis/actions/authActions.api";

interface LoginInfo {
  username: string;
  password: string;
}

const INITIAL_STATE: LoginInfo = {
  username: "Boaz",
  password: "Bb123456",
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginInfo>(INITIAL_STATE);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitHandler = async () => {
    const { username, password } = loginData;
    const user = await getUser(username, password);
    dispatch(UserAction.login(user));
  };
  return (
    <div className={classes.__login}>
      <h1>Welcome</h1>
      <input
        name="username"
        onChange={onChangeHandler}
        value={loginData.username}
        type="text"
        placeholder="Username"
      />
      <input
        name="password"
        onChange={onChangeHandler}
        value={loginData.password}
        type="password"
        placeholder="Password"
      />
      <button onClick={submitHandler}>Login</button>
    </div>
  );
};

export default Login;
