import {
  Address,
  Rank,
  Type,
  WorkExperience,
  WorkingForm,
} from 'src/constant/enum';

export class CreateRecruitmentDTO {
  email: string;
  phone: string;
  salary: string;
  imgUrl: string;
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
