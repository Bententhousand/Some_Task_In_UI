export class ManpowerPersonalDetails {
  ManPowerId: number;
  Name: string;
  Gender: string;
  DateofBirth: Date;
  Age: number;
  Mobile: string;
  AlternateNumber: string;
  MaritalStatus: number;
  CurrentAddress: string;
  PermanentAddress: string;
  Photo: string;
  State: string;
  City: string;
  JobType: string;
  Company: string;
  DateofJoin: string;
  Designation: string;
  ReferenceBy: string;
  PreviousCompany: string;
  ReferenceContact1: string;
  ReferenceContact2: string;
  TotalExperience: number;
  VerificationStatus: number;
  FatherName: string;
  MotherName: string;
  Payment: string;
  BloodGroup: string;
  CreatedBy: string;
  ModifiedBy:string;
  Active: number;
}

export class ManpowerVerificationDetails {
  Id: number;
  ManPowerId: number;
  ProofId: number;
  ProofCardNo: string;
  ProofUrl: string;
  CreatedBy: string;
}

export class ManpowerFamilyDetails {
  Id: number;
  ManPowerId: number;
  MemberName: string;
  Relationship: string;
  Age: string;
  NomineeStatus: "";
  CreatedBy: string;
}

export class ManpowerBankDetails {
  Id: number;
  ManPowerId: number;
  AccountType: number;
  IFSCCode: string;
  BankId: {};
  AccountNumber: string;
  PassbookUrl: string;
  Active: string;
  CreatedBy: string;
}
