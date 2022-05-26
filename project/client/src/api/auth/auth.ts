import { getApi, postApi } from "../../untils/apiHelper";
import {
  IAuthRequest,
  IAuthResponse,
  IGetAccountResponse,
  IGetAllAccountResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../type/auth";

export const loginApi = async ({ email, passWord }: IAuthRequest) => {
  const data = await postApi<IAuthRequest, IAuthResponse>(`/auth/login`, {
    email,
    passWord,
  });
  return data;
};

export const RegisterApi = async ({
  email,
  passWord,
  userName,
  role,
}: IRegisterRequest) => {
  const data = await postApi<IRegisterRequest, IRegisterResponse>(
    `/auth/register`,
    {
      email,
      passWord,
      userName,
      role,
    }
  );
  return data;
};

export const getAccountApi = async () => {
  const data = await getApi<IGetAccountResponse>(`/auth/getAccount`);
  return data;
};

export const getAllAccountApi = async () => {
  const data = await getApi<IGetAllAccountResponse>(`/auth/getAllAccount`);
  return data;
};

export const updateStatusAccountApi = async (id: string) => {
  const data = await getApi<IGetAccountResponse>(
    `/auth/updateStatusAccount?id=${id}`
  );
  return data;
};

