export interface LoginModel{
  EmailAddress:string;
  Password:string;
}

export interface AccountModel{
  UserRoleId: number;
  EmailAddress:string;
  Password:string;
  IsActive:Boolean;
  RefreshToken: string;
}




export interface AddPersonalInfoDto {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: number | null;
  genderId: number;
}

export interface AddEducationalInfoDto {
  instituteName: string;
  degree: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
}

export interface AddAddressInfoDto {
  addressId: string;
  locality: string;
  city: string;
  state: string;
  zipCode: number | null;
  country: string;
}

export interface AddSkillsDto {
  skillName: string;
  skillProficiencyId: number;
}

export interface GetPersonalInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: number;
  genderId: number;
}

export interface GetEducationalInfoDto {
  educationalId: string;
  instituteName: string;
  degree: string;
  startDate: string;
  endDate: string;
  personalInfoId: string;
}

export interface GetAddressInfoDto {
  addressId: string;
  locality: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  personalInfoId: string;
}

export interface GetSkillsDto {
  skillId: string;
  skillName: string;
  skillProficiencyId: number;
  personalInfoId: string;
}

export interface AddCandidateInfoModel {
  personalInfoDto: AddPersonalInfoDto;
  educationalInfoDto: AddEducationalInfoDto[];
  addressInfoDto: AddAddressInfoDto[];
  skillsDto: AddSkillsDto[];
}

export interface GetCandidateInfoModel {
  personalInfoDto: GetPersonalInfoDto;
  educationalInfoDto: GetEducationalInfoDto[];
  addressInfoDto: GetAddressInfoDto[];
  skillsDto: GetSkillsDto[];
}

export interface Gender {
  id: number;
  genderCode: string;
  genderName: string;
}

export interface Proficiency{
  id: number;
  name: string;
}

export interface SignUp{
  userName: string,
  userEmail: string,
  password: string
}