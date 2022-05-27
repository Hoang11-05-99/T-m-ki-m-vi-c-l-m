import {
  Address,
  Rank,
  Sex,
  Type,
  WorkExperience,
  WorkingForm,
} from 'src/constant/enum';

export class CreateRecruitmentDTO {
  phone: string;
  deadline: string;
  gender: Sex;
  degree: string;
  salary: string;
  title: string;
  description: string;
  contact: string;
  address: Address;
  type: Type;
  workingForm: WorkingForm;
  rank: Rank;
  workExperience: WorkExperience;
  quantity: string;
}
