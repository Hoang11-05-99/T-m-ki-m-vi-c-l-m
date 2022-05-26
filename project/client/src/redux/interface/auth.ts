import { Account } from "../../api/type/auth";

export interface IAuthState {
  isAuthorized: boolean;
  loading: boolean;
  token: string | null;
  account: Account | null;
  accounts: Account[] | null;
  status: number | null;
  message: string | null;
}
