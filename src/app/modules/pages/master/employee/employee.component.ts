import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EmployeeMasterService } from '../../../services/master/employee.master.service';
import { BankDetail, Employee } from '../../../models/employee/employee';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DatePipe]
})
export class EmployeeComponent implements OnInit {

  viewFlag = true;
  isEditing = false;
  show: boolean = false;
  bloodGroupData = [{ Name: 'A+' }, { Name: 'A-' }, { Name: 'B+' }, { Name: 'B-' }, { Name: 'O+' }, { Name: 'O-' }, { Name: 'AB+' }, { Name: 'AB-' }]
  Photo: any;
  photoFlag: boolean = false;
  tabIsEditing: boolean = false;
  tabIndex: number;



  constructor(private _employeeMasterService: EmployeeMasterService,
    private _datePipe: DatePipe,
    private _confirmationDialogComponent: ConfirmationDialogComponent) { }



  EmployeeData: any[] = [];
  stateData: any[] = [];
  CompanyData: any[] = [];
  cityData: any[] = [];
  designationData: any[] = [];
  bloodgroupData: any[] = [];
  reportData: any[] = [];
  BankData: any[] = [];

  // employeeMaster: any = {
  //   Id: 0,
  //   EmployeeId: 0,
  //   FirstName: '',
  //   SecondName: '',
  //   FatherName: '',
  //   Gender: '',
  //   DateOfBirth: new Date,
  //   ContactNo: 0,
  //   Email: '',
  //   CurrentAddress: '',
  //   PermanentAddress: '',
  //   NativePlace: '',
  //   MedicalExam: '',
  //   DesignationId: 0,
  //   ReportTo: 0,
  //   BloodGroup: '',
  //   ReportToName: '',
  //   CompanyId: '',
  //   DesignationName: '',
  //   CompanyName: '',
  //   State: '',
  //   StateId: 0,
  //   CityId: 0,
  //   City: '',
  //   CreatedDate: new Date,
  //   ModifiedDate: new Date,
  //   CreatedBy: sessionStorage.getItem('UserID'),
  //   modifiedBy: sessionStorage.getItem('UserID'),
  //   Active: true,

  // }

  // employeeBankMaster: any = {
  //   EmployeeBankId: 0,
  //   Id: 0,
  //   AccountNo: '',
  //   BankName: '',
  //   IFSC: '',
  //   MICR: '',
  //   Branch: '',
  //   isPrimary: '',
  //   CreatedBy: sessionStorage.getItem('UserID'),

  // }
  employeeDetail: any = {

    EmployeeId: 0,
    FirstName: '',
    LastName: '',
    FatherName: '',
    Gender: '',
    DateOfBirth: new Date,
    ContactNo: 0,
    Email: '',
    CurrentAddress: '',
    PermanentAddress: '',
    NativePlace: '',
    MedicalExam: '',
    DesignationId: 0,
    ReportTo: 0,
    BloodGroup: '',
    ReportToName: '',
    CompanyId: '',
    DesignationName: '',
    CompanyName: '',
    State: '',
    StateId: 0,
    CityId: 0,
    City: '',
    AdhaarNo: '',
    Photo: '',
    JobType: '',
    DOJ: new Date,
    ReferenceBy: '',
    ReferenceContact1: '',
    ReferenceContact2: '',
    MaritalStatus: '',
    MotherName: '',
    PreviousCompany: '',
    AlternateContactNo: '',
    CreatedDate: new Date,
    ModifiedDate: new Date,
    CreatedBy: sessionStorage.getItem('UserID'),
    modifiedBy: sessionStorage.getItem('UserID'),
    Active: true,

    // BankDetail: [{
    //   EmployeeBankId: 0,
    //   EmployeeId: 0,
    //   AccountNo: '',
    //   BankName: '',
    //   IFSC: '',
    //   MICR: '',
    //   Branch: '',
    //   isPrimary: '',
    //   CreatedBy: sessionStorage.getItem('UserID'),
    // }]
  };

  BankDetails: any = {
    EmployeeBankId: 0,
    EmployeeId: '',
    AccountNo: '',
    BankName: '',
    IFSC: '',
    MICRCode: '',
    Branch: '',
    isPrimary: '',
    CreatedBy: sessionStorage.getItem('UserID'),
  };

  unchangeEmployeeDetail: any = {};

  upadteEmployeeDetail: any = {};

  displayedColumns: string[] = [
    "EmployeeId",
    "Name",
    "Contact",
    "Designation",
    "Company",
    "ReportTo",
    "Active",
    "Action"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  LoadEmployeeMaster(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    debugger
    this._employeeMasterService.getAllEmployee(element).subscribe(
      (result: any) => {
        console.log(result);
        this.EmployeeData = result.result;
        this.dataSource.paginator = this.paginator;
        this.dataSource = result.result;
        console.log(this.EmployeeData, 'Employee All');
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.LoadEmployeeMaster();
    this.getAllCompany();
    this.getAllState();
  }

  getBankDetail(): void {
    debugger;
    // let Element = {
    //   Id: 1031,
    //   Active: true,
    //   ActionBy: sessionStorage.getItem('UserID')
    // }
    var Id = 1031
    this._employeeMasterService.getBankDetail(Id).subscribe(
      (result: any) => {
        console.log(result);
        this.BankData = result.result;
        console.log(this.BankData);
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  addBankDetails() {
    var tempObj = {
      AccountNo: this.BankDetails.AccountNo,
      BankName: this.BankDetails.BankName,
      IFSC: this.BankDetails.IFSC,
      MICR: this.BankDetails.MICR,
      Branch: this.BankDetails.Branch,
      isPrimary: this.BankDetails.isPrimary,
      CreatedBy: Number(sessionStorage.getItem('UserID')),
    }
    if (this.isEditing) {
      if (this.tabIsEditing) {
        this.modifyBankDetailOnModify(this.tabIndex);
      } else {
        this.addBankDetailOnModify();
      }
    } else {
      if (this.tabIsEditing) {
        this.BankData[this.tabIndex] = tempObj;
      } else {
        this.BankData.push(tempObj);
      }
    }
    this.BankDetails = {};
  }

  addBankDetailOnModify() {
    var tempObj = {
      Id: this.employeeDetail.Id,
      AccountNo: this.BankDetails.AccountNo,
      BankName: this.BankDetails.BankName,
      IFSC: this.BankDetails.IFSC,
      MICR: this.BankDetails.MICR,
      Branch: this.BankDetails.Branch,
      isPrimary: this.BankDetails.isPrimary,
      CreatedBy: Number(sessionStorage.getItem('UserID')),
    }
    this._employeeMasterService.addBank(tempObj).subscribe(
      (result: any) => {
        if (result == true) {
          alert("Successfully Added");
          this.BankData.push(tempObj);
        }
      },
      error => {
        if (error.status === 401) { ("Unauthorized"); }
        else { alert("Something went wrong! Try Again"); }
      }
    );
  }

  modifyBankDetailOnModify(index) {
    var tempObj = {
      EmployeeBankId: this.BankDetails.EmployeeBankId,
      Id: this.employeeDetail.Id,
      AccountNo: this.BankDetails.AccountNo,
      BankName: this.BankDetails.BankName,
      IFSC: this.BankDetails.IFSC,
      MICR: this.BankDetails.MICR,
      Branch: this.BankDetails.Branch,
      isPrimary: this.BankDetails.isPrimary,
      CreatedBy: Number(sessionStorage.getItem('UserID')),
    }
    this._employeeMasterService.modifyBank(tempObj).subscribe(
      (result: any) => {
        if (result == true) {
          alert("Successfully Modified");
          this.BankData[index] = tempObj;
        }
      },
      error => {
        if (error.status === 401) { ("Unauthorized"); }
        else { alert("Something went wrong! Try Again"); }
      }
    );
  }

  editBankDetails(modifyBank, index: number): void {
    this.BankDetails = modifyBank;
    this.tabIsEditing = true;
    this.tabIndex = index;
  }


  removeEmployeeDetail(element): void {
    let deleteElement = {
      Id: element.EmployeeId,
      Active: true,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._employeeMasterService.removeEmployee(deleteElement).subscribe(
      (result: any) => {
        if (result.result == true) {
          alert("Remove Successfully");
          this.LoadEmployeeMaster();
        }
      },
      error => {
        if (error.status === 401) { ("Unauthorized"); }
        else { alert("Something went wrong! Try Again"); }
      }
    );
  }

  onNewClick() {
    debugger;
    this.viewFlag = !this.viewFlag;
    this.employeeDetail = {};
    // this.getBankDetail();
    this.isEditing = false;
  }

  resetScreen(): void {
    this.employeeDetail = Object.assign({}, this.unchangeEmployeeDetail);
    this.viewFlag = !this.viewFlag;
    this.show = false;

  }

  removeBankDetail(element): void {
    let deleteElement = {
      Id: element.Id,
      Active: element.Active,
      ActionBy: parseInt(sessionStorage.getItem('UserID'))
    }
    this._employeeMasterService.removebank(deleteElement).subscribe(
      (result: any) => {
        console.log(result);
      },
      error => {
        if (error.status === 401) { alert("Unauthorized"); }
        else { alert("Something went wrong! Try Again"); }
      }
    );
  }

  getAllCompany(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    this._employeeMasterService.getCompany(element).subscribe(
      (result: any) => {
        console.log(result);
        this.CompanyData = result;
        console.log(this.CompanyData);
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  getAllCity(): void {
    // let element = {
    //   StateId: this.customer.State,
    // //  ActionBy: sessionStorage.getItem('UserID')
    // };
    this._employeeMasterService.getCity(this.employeeDetail.State).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.cityData = result;
        console.log(this.cityData);
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }




  getAllState(): void {
    debugger;
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    this._employeeMasterService.getState(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.stateData = result;
        console.log(this.stateData);
        //  this.getAllCity();
        this.cityData = [];
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  getDesignation(): void {
    this._employeeMasterService.getDesignationById(this.employeeDetail.CompanyId).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.designationData = result;
        console.log(this.designationData, 'Des');
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }







  getReportTo(): void {
    debugger;
    let element = {
      EmployeeId: this.employeeDetail.EmployeeId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._employeeMasterService.getReport(element).subscribe(
      (result: any) => {
        debugger;
        this.reportData = result.result;
        console.log(this.reportData, 'Report');
      },
      error => {
        if (error.status === 401) { alert("Unauthorized"); }
        else { alert("Something went wrong! Try Again"); }
      }
    );
  }


  saveEmployee(): void {
    debugger;

    // if (this.checkValidation()) {
    if (this.employeeDetail.PF == 1) {
      this.employeeDetail.BankDetail = this.BankData;
      this.employeeDetail.CreatedBy = Number(sessionStorage.getItem('UserID'));
      this.addCustomer();
    } else {
      this._confirmationDialogComponent.openAlertDialog("Enter Employee Bank Details");
    }

    // }
  }

  checkValidation(): boolean {
    if (this.employeeDetail.FirstName === '') {
      alert("Enter FirstName Name");
      // ('Enter FirstName Name')
      return false;
    } else if (this.employeeDetail.SecondName === 0) {
      ('Select SecondName')
      return false;
    } else if (this.employeeDetail.FatherName === '') {
      ('Enter FatherName')
      return false;
    } else if (this.employeeDetail.Gender === 0) {
      ('Select Gender')
      return false;
    }
    else if (this.employeeDetail.DateOfBirth === '') {
      ('Enter DateOfBirth')
      return false;
    }
    else if (this.employeeDetail.ContactNo === 0) {
      ('Select ContactNo')
      return false;
    }

    else if (this.employeeDetail.Email === '') {
      ('Enter Email')
      return false;
    }
    else if (this.employeeDetail.MedicalExam === '') {
      ('Enter MedicalExam')
      return false;
    }
    else if (this.employeeDetail.CompanyName === '') {
      ('Enter CompanyName')
      return false;
    }
    // else if (this.employeeDetail.DesignationName === '') {
    //   ('Enter DesignationName')
    //   return false;
    // }
    else if (this.employeeDetail.ReportTo === '') {
      ('Enter ReportTo')
      return false;
    }
    else if (this.employeeDetail.NativePlace === 0) {
      ('Enter NativePlace')
      return false;
    }
    else if (this.employeeDetail.CurrentAddress === 0) {
      ('Enter CurrentAddress')
      return false;
    }
    else if (this.employeeDetail.PermanentAddress === 0) {
      ('Enter PermanentAddress')
      return false;
    }
    else if (this.employeeDetail.State === '') {
      ('Enter State')
      return false;
    }
    else if (this.employeeDetail.City === 0) {
      ('Enter City')
      return false;
    } else if (this.employeeDetail.BloodGroup === 0) {
      ('Enter BloodGroup')
      return false;
    } else {
      return true;
    }
  }

  addCustomer(): void {
    debugger;
    const formData = new FormData();
    if (!this.isEditing) {
      if (this.Photo != undefined && this.Photo != '' && this.photoFlag == true) {
        formData.append("data", JSON.stringify(this.employeeDetail));
        this.photoFlag ?
          (formData.append("Photo", (this.Photo == "") ? "" : this.Photo)) :
          (formData.append("Photo", (this.Photo == "") ? "" : this.Photo));
        this._employeeMasterService.addEmployeeWithPhoto(formData).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully added");
              this.BankData = [];
              this.employeeDetail = {};
              this.viewFlag = !this.viewFlag;
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      } else {
        this._employeeMasterService.addEmployee(this.employeeDetail).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully added");
              this.BankData = [];
              this.employeeDetail = {};
              this.viewFlag = !this.viewFlag;
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      }
    } else {
      if (this.Photo != undefined && this.Photo != '' && this.photoFlag == true) {
        formData.append("data", JSON.stringify(this.employeeDetail));
        this.photoFlag ?
          (formData.append("Photo", (this.Photo == "") ? "" : this.Photo)) :
          (formData.append("Photo", (this.Photo == "") ? "" : this.Photo));
        this._employeeMasterService.modifyEmployeeWithPhoto(formData).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully modified");
              this.BankData = [];
              this.employeeDetail = {};
              this.viewFlag = !this.viewFlag;
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      } else {
        this._employeeMasterService.modifyEmployee(this.employeeDetail).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully modified");
              this.BankData = [];
              this.employeeDetail = {};
              this.viewFlag = !this.viewFlag;
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      }
    }
  }

  uploadImage(event) {
    const fileList = event.target.files;
    if (fileList && event.target.files[0]) {
      // const file = event.target.files[0];
      this.Photo = fileList[0];
      this.photoFlag = true;
      // const reader = new FileReader();
      // reader.onload = e => this.employeeDetail.Photo = reader.result;
      // reader.readAsDataURL(file);
    }
  }


  // addCustomer(): void {
  //   debugger;
  //   const obj = new Employee();
  //   obj.Id = this.employeeDetail.EmployeeId;
  //   obj.FirstName = this.employeeDetail.FirstName;
  //   obj.SecondName = this.employeeDetail.LastName;
  //   obj.FatherName = this.employeeDetail.FatherName;
  //   obj.Gender = this.employeeDetail.Gender;
  //   obj.DateOfBirth = new Date(this.employeeDetail.DateOfBirth);
  //   obj.ContactNo = this.employeeDetail.ContactNo;
  //   obj.Email = this.employeeDetail.Email;
  //   obj.CurrentAddress = this.employeeDetail.CurrentAddress;
  //   obj.PermanentAddress = this.employeeDetail.PermanentAddress;
  //   obj.NativePlace = this.employeeDetail.NativePlace;
  //   obj.BloodGroup = this.employeeDetail.BloodGroup;
  //   obj.MedicalExam = this.employeeDetail.MedicalExam;
  //   obj.DesignationId = this.employeeDetail.DesignationId;
  //   obj.DesignationName = this.employeeDetail.DesignationName;
  //   obj.ReportTo = this.employeeDetail.ReportTo;
  //   obj.ReportToName = this.employeeDetail.ReportToName;
  //   obj.CompanyId = this.employeeDetail.CompanyId;
  //   obj.CompanyName = this.employeeDetail.CompanyName;
  //   obj.State = this.employeeDetail.State;
  //   obj.City = this.employeeDetail.City;
  //   obj.StateId = this.employeeDetail.StateId;
  //   obj.CityId = this.employeeDetail.CityId;
  //   obj.CreatedBy = sessionStorage.getItem('UserID');
  //   obj.AdhaarNo = this.employeeDetail.AdhaarNo;
  //   obj.AlternateContactNo = this.employeeDetail.AlternateContactNo;
  //   obj.Photo = this.employeeDetail.Photo;
  //   obj.PreviousCompany = this.employeeDetail.PreviousCompany;
  //   obj.JobType = this.employeeDetail.JobType;
  //   obj.DOJ = new Date(this.employeeDetail.DOJ);
  //   obj.ReferenceBy = this.employeeDetail.ReferenceBy;
  //   obj.ReferenceContact1 = this.employeeDetail.ReferenceContact1;
  //   obj.ReferenceContact2 = this.employeeDetail.ReferenceContact2;
  //   obj.MaritalStatus = this.employeeDetail.MaritalStatus;
  //   obj.MotherName = this.employeeDetail.MotherName;
  //   obj.Active = !this.isEditing ? 1 : this.employeeDetail.Active == undefined ? 1 : this.employeeDetail.Active;
  //   obj.ModifiedBy = sessionStorage.getItem('UserID');
  //   if (!this.isEditing) {
  //     this._employeeMasterService.addEmployee(obj).subscribe(
  //       (result: any) => {
  //         debugger;
  //         if (result.result === true) {
  //           ("Successfully added");
  //           this.onNewClick();
  //           this.ngOnInit();
  //         }
  //       },
  //       error => {
  //         if (error.status === 401) {
  //           ("Unauthorized");
  //         } else {
  //           ("Something went wrong! Try Again");
  //         }
  //       }
  //     );
  //   } else {
  //     this._employeeMasterService.modifyEmployee(obj).subscribe(
  //       (result: any) => {
  //         if (result.result === true) {
  //           ("Successfully modified");
  //           this.ngOnInit();
  //           this.onNewClick();
  //         }
  //       },
  //       error => {
  //         if (error.status === 401) {
  //           ("Unauthorized");
  //         } else {
  //           ("Something went wrong! Try Again");
  //         }
  //       }
  //     );
  //   }
  // }

  showBankDetails() {
    this.show = !this.show;
    this.BankDetails = {};
  }


  editEmployeeDetails(modifyEmployee): void {
    debugger;
    this.employeeDetail = modifyEmployee;
    console.log(this.employeeDetail, 'Emp');
    this.designationData = [{ DesignationId: modifyEmployee.DesignationId, DesignationName: modifyEmployee.DesignationName }];
    this.getDesignation();
    this.viewFlag = !this.viewFlag;
    this.isEditing = true;
  }


}
