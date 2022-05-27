import { Marry, Rank, Salary, Sex, Type, WorkingForm } from 'src/constant/enum';

export class CreateProfileDTO {
  name: string;
  birthday: string;
  address: string;
  firstDay: string;
  endDay: string;
  branch: string;
  schoolName: string;
  language: string;
  marry: Marry;
  salary: Salary;
  rank: Rank;
  workForm: WorkingForm;
  branchWant: Type;
  phone: string;
  email: string;
  imgUrl: string;
  experience: string;
  skill: string;
  target: string;
  gender: Sex;
}
