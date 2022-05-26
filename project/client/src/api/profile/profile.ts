import { getApi, postApi, putApi } from "../../untils/apiHelper";
import { IProfileResponse, Profile } from "../type/profile";

export const createProfileApi = async ({
  email,
  birthday,
  degree,
  experience,
  gender,
  hobby,
  imgUrl,
  name,
  phone,
  skill,
  target,
}: Profile) => {
  const data = await postApi<Profile, IProfileResponse>(`/user/createProfile`, {
    email,
    birthday,
    degree,
    experience,
    gender,
    hobby,
    name,
    imgUrl,
    phone,
    skill,
    target,
  });
  return data;
};

export const updateProfileApi = async ({
  email,
  birthday,
  degree,
  experience,
  imgUrl,
  gender,
  hobby,
  name,
  phone,
  skill,
  target,
}: Profile) => {
  const data = await putApi<Profile, IProfileResponse>(`/user/updateProfile`, {
    email,
    birthday,
    degree,
    experience,
    gender,
    imgUrl,
    hobby,
    name,
    phone,
    skill,
    target,
  });
  return data;
};

export const getProfileApi = async () => {
  const data = await getApi<IProfileResponse>(`/user/getProfile`);
  return data;
};
