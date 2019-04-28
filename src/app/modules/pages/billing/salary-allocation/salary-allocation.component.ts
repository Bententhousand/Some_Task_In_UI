import { Component, OnInit } from "@angular/core";
import { salaryAllocation } from "../../../models/salary-allocation/salary-allocation.model";
import { SalaryAllocationService } from "../../../services/billing/salary-allocation.service";

@Component({
  selector: "app-salary-allocation",
  templateUrl: "./salary-allocation.component.html",
  styleUrls: ["./salary-allocation.component.css"]
})
export class SalaryAllocationComponent implements OnInit {
  companyList: any[] = [];
  employeeTypeList: any[] = [];
  ServiceMasterList: any[] = [];
  DesignationList: any[] = [];
  EmployeeList: any[] = [];
  SalaryCompensateList: any[] = [];
  SalaryList: any[] = [];
  SalaryAllocationList: any[] = [];

  objSalaryAllocation: salaryAllocation = {
    selectedCompany: -1,
    selectedEmployeeType: -1,
    selectedDepartment: -1,
    selectedDesignation: -1,
    selectedEmployee: -1,
    selectedDate: new Date(),
    allocationTable: []
  };

  unchangedSalaryAllocation: salaryAllocation = {
    selectedCompany: -1,
    selectedEmployeeType: -1,
    selectedDepartment: -1,
    selectedDesignation: -1,
    selectedEmployee: -1,
    selectedDate: new Date(),
    allocationTable: []
  };

  constructor(private _salaryAllocationService: SalaryAllocationService) {}

  ngOnInit() {
    this.getAllCompany();
  }

  getAllCompany() {
    var objGetComDTO = {
      ActionBy: 1001
    };
    this._salaryAllocationService.getAllCompany().subscribe(
      (result: any) => {
        console.log(result);
        debugger;
        this.companyList = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEmployeeType() {
    var objEmployeeTypeDTO = {
      ActionBy: 1001
    };
    this._salaryAllocationService
      .getAllEmployeeType(objEmployeeTypeDTO)
      .subscribe(
        (result: any) => {
          this.employeeTypeList = result.result;
          console.log(this.employeeTypeList);
        },
        error => {
          console.log(error);
        }
      );
  }

  getDepartment() {
    var objGetServiceDTO = {
      EmployeeType: this.objSalaryAllocation.selectedEmployeeType,
      ActionBy: 1001
    };

    this._salaryAllocationService.getAllServices(objGetServiceDTO).subscribe(
      (result: any) => {
        this.ServiceMasterList = result.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDesignation() {
    var objDesignationDTO = {
      DepartmentId: this.objSalaryAllocation.selectedDepartment,
      ActionBy: 1001
    };

    this._salaryAllocationService
      .getAllDesignation(objDesignationDTO)
      .subscribe(
        (result: any) => {
          this.DesignationList = result.result;
        },
        error => {
          console.log(error);
        }
      );
  }

  getEmployee() {
    var objEmployeeDTO = {
      EmployeeType: this.objSalaryAllocation.selectedEmployeeType,
      DesignationId: this.objSalaryAllocation.selectedDesignation,
      ActionBy: 1001
    };
    this._salaryAllocationService.getAllEmployee(objEmployeeDTO).subscribe(
      (result: any) => {
        this.EmployeeList = result.result;
        console.log(this.EmployeeList);
        this.loadSalaryComponent();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadSalaryComponent() {
    var objGetSalaryDTO = {
      ActionBy: 1001
    };
    this._salaryAllocationService
      .getAllSalaryCompensate(objGetSalaryDTO)
      .subscribe(
        (result: any) => {
          this.SalaryCompensateList = result.result;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  getSalaryComponent() {
    var objGetSalaryDTO = {
      EmployeeId:
        this.objSalaryAllocation.selectedEmployee == -1
          ? null
          : this.objSalaryAllocation.selectedEmployee,
      ManpowerId:
        this.objSalaryAllocation.selectedEmployee == -1
          ? null
          : this.objSalaryAllocation.selectedEmployee,
      ActionBy: 1001
    };
    this._salaryAllocationService
      .getAllSalaryByEmployee(objGetSalaryDTO)
      .subscribe(
        (result: any) => {
          this.SalaryList = result.result;
          console.log(this.SalaryList);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllSalaryAllocation() {
    var objGetSalaryDTO = {
      EmployeeId:
        this.objSalaryAllocation.selectedEmployee != -1
          ? this.objSalaryAllocation.selectedEmployee
          : null,
      ManpowerId:
        this.objSalaryAllocation.selectedEmployee != -1
          ? this.objSalaryAllocation.selectedEmployee
          : null,
      ActionBy: 1001
    };

    this._salaryAllocationService
      .getAllSalaryAllocation(objGetSalaryDTO)
      .subscribe(
        (result: any) => {
          this.SalaryAllocationList = result.result;
        },
        error => {
          console.log(error);
        }
      );
  }

  open1() {}

  viewSalary() {
    var objGetSalaryDTO = {
      EmployeeId:
        this.objSalaryAllocation.selectedEmployee != -1
          ? this.objSalaryAllocation.selectedEmployee
          : null,
      ManpowerId:
        this.objSalaryAllocation.selectedEmployee != -1
          ? this.objSalaryAllocation.selectedEmployee
          : null,
      ActionBy: 1001
    };
    this._salaryAllocationService
      .getAllSalaryAllocation(objGetSalaryDTO)
      .subscribe(
        (result: any) => {
          this.SalaryAllocationList = result.result;
        },
        error => {
          console.log(error);
        }
      );
  }
}
