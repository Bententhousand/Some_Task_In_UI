

export class Employee {
    // ReferenceId: string;
    Id:number;
    FirstName: string;
    SecondName: string;
    FatherName: string;
    Gender: string;
    DateOfBirth: Date;
    DOJ:Date;
    ContactNo: string;
    Email: string;
    CurrentAddress: string;
    PermanentAddress: string;
    NativePlace: string;
    MedicalExam: boolean;
    DesignationId: number;
    ReportTo: number;
    BloodGroup: string;
    ReportToName: string;
    CompanyId: number;
    DesignationName: string;
    CompanyName: string;
    State: number;
    StateId: number;
    AdhaarNo:string;
    AlternateContactNo:string;
    Photo:string;
    PreviousCompany:string;
    JobType:string;
    CityId: number;
    City: number;
    ReferenceBy:string;
    ReferenceContact1:string;
    ReferenceContact2:string;
    MaritalStatus:string
    MotherName:string;
    // CreatedDate: Date;
    CreatedBy: string;
    ModifiedBy:string;
    // ModifiedDate:Date;
    // CreatedBy: localStorage.getItem('userID')
    // modifiedBy: localStorage.getItem('userID'),
    Active: boolean;
    // BankDetails:BankDetail;
  }
  export class BankDetail {
    EmployeeBankId: number;
    EmployeeId: number;
    AccountNo: string;
    BankName: string;
    IFSC: string;
    MICRCode: string;
    Branch: string;
    isPrimary: boolean;
    CreatedBy:string;

  }