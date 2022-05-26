import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAccountApi,
  getAllAccountApi,
  loginApi,
  RegisterApi,
  updateStatusAccountApi,
} from "../../api/auth/auth";
import {
  IAuthRequest,
  IAuthResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../../api/type/auth";

export const loginAction = createAsyncThunk<IAuthResponse, IAuthRequest>(
  "auth/login",
  async (data: IAuthRequest) => {
    const response = { ...(await loginApi(data)) };
    return response;
  }
);

export const registerAction = createAsyncThunk<
  IRegisterResponse,
  IRegisterRequest
>("auth/register", async (data: IRegisterRequest) => {
  const response = { ...(await RegisterApi(data)) };
  return response;
});

export const getAccountAction = createAsyncThunk(
  "auth/getAccount",
  async () => {
    const response = { ...(await getAccountApi()) };
    return response;
  }
);

export const updateStatusAction = createAsyncThunk(
  "auth/updateStatus",
  async (id: string) => {
    const response = { ...(await updateStatusAccountApi(id)) };
    return response;
  }
);

export const getAllAccountAction = createAsyncThunk(
  "auth/getAllAccount",
  async () => {
    const response = { ...(await getAllAccountApi()) };
    return response;
  }
);
