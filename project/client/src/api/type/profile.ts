import { IResponse } from "./IResponse";

export interface Profile {
  name: string;
  birthday: string;
  phone: string;
  email: string;
  imgUrl: string;
  degree: string;
  experience: string;
  skill: string;
  hobby: string;
  target: string;
  gender: Sex;
}

export interface IProfileResponse extends IResponse {
  result: Profile;
}

export enum Sex {
  NAM = "Nam",
  NU = "Nữ",
}
