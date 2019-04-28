export class CompanyList {
  Id: number;
  Name: string;
  Address: string;
  Type: string;
  ContactNo: string;
  WebsiteAddress: string;
  PFNumber: string;
  GSTNumber: string;
  PANNumber: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  Active: boolean;
}

export class EmployeeType {
  Id: number;
  Name: string;
}

export class DepartmentType {
  DepartmentId: number;
  DepartmentName: string;
}

export class DesignationType {
  DesignationId: number;
  DesignationName: string;
}

export class salaryAllocation {
  selectedCompany: number;
  selectedEmployeeType: number;
  selectedDepartment: number;
  selectedDesignation: number;
  selectedEmployee: number;
  selectedDate: Date;
  allocationTable: any[];
}

export class salaryAllocationTable {
  Id: number;
  SalaryComponentId: number;
  Type: string;
  Value: number;
  FromDeduction: number;
  DeductionName: string;
  FromDeductionName: string;
  Date: Date;
  ComponentName: string;
  Amount: number;
}
