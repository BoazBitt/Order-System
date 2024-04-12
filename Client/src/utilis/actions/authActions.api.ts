/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { PATH_SERVER } from "./APIEndpoint";

interface UserInfo {
  first_name: string;
  last_name: string;
  token: string;
}

export const getUser = async (
  username: string,
  password: string
): Promise<UserInfo> => {
  const userInfo: UserInfo = {
    first_name: "",
    last_name: "",
    token: "",
  };
  try {
    const { data } = await axios.post(`${PATH_SERVER}/auth/`, {
      username: username,
      password: password,
    });
    userInfo.token = data.token;
    const accountResponse = await axios.get(
      `${PATH_SERVER}/login/${username}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    userInfo.first_name = accountResponse.data.first_name;
    userInfo.last_name = accountResponse.data.last_name;
    return userInfo;
  } catch (error: any) {
    return error.response.data;
  }
};
