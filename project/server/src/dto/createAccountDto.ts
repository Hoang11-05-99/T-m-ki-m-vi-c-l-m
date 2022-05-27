import { Role } from 'src/constant/enum';

export class CreateAccountDTO {
  email: string;
  userName: string;
  passWord: string;
  imgUrl: string;
  role: Role;
  status: boolean;
}
