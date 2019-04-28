import { Component, OnInit } from '@angular/core';
import { AssignFieldOfficer } from '../../../models/assign-field-officer/assign-field-officer.model';
import { AssignFieldOfficerService } from '../../../services/operation/assign-field-officer.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-assign-field-officer',
  templateUrl: './assign-field-officer.component.html',
  styleUrls: ['./assign-field-officer.component.css']
})
export class AssignFieldOfficerComponent implements OnInit {

  viewFlag = true;
  isEditing = false;

  assignFieldOfficer: AssignFieldOfficer = {
    EmployeeId: 0,
    CustomerId: 0,
    BranchId: 0,
    Site: {},
    CreatedBy: sessionStorage.getItem('UserID'),
  }

  customerData: any[] = [];
  areaData: any[] = [];
  siteData: any[] = [];
  employeeData: any[] = [];
  fieldOfficerData: any[] = [];

  constructor(private _assignFieldOfficerService: AssignFieldOfficerService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) { }

  ngOnInit() {
    this.getEmployees();
    this.getCustomers();
  }

  addFieldOfficer(): void {
    debugger;
    var tempSite = [];
    for (var i in this.assignFieldOfficer.Site) {
      var temp = {
        SiteId: this.assignFieldOfficer.Site[i].SiteId
      }
      tempSite.push(temp);
    }
    let element = {
      EmployeeId: this.assignFieldOfficer.EmployeeId,
      CustomerId: this.assignFieldOfficer.CustomerId,
      BranchId: this.assignFieldOfficer.BranchId,
      Site: tempSite,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.addFieldOfficer(element).subscribe(
      (result: any) => {
        debugger;
        if (result.result === true) {
          this._confirmationDialogComponent.openAlertDialog("Successfully added");
          this.clearAfterSave();
          this.getFieldOfficer();
        }
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }


  removeFieldOfficer(obj: any): void {
    let element = {
      Id: obj.Id,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.removeFieldOfficer(element).subscribe(
      (result: any) => {
        const manpowerData = result;
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getEmployees(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.getEmployees(element).subscribe(
      (result: any) => {
        this.employeeData = result.result;
        // console.log(this.employeeData);
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getFieldOfficer(): void {
    debugger;
    this.clearAfterSave();
    let element = {
      EmployeeId: this.assignFieldOfficer.EmployeeId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.getFieldOfficer(element).subscribe(
      (result: any) => {
        this.fieldOfficerData = result.result;
        console.log(this.fieldOfficerData);
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getCustomers(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.getCustomers(element).subscribe(
      (result: any) => {
        this.customerData = result.result;
        this.areaData = [];
        this.siteData = [];
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getArea(): void {
    this.areaData = [];
    let element = {
      CustomerId: this.assignFieldOfficer.CustomerId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.getArea(element).subscribe(
      (result: any) => {
        this.areaData = result.result;
        this.siteData = [];
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getSite(): void {
    let element = {
      CustomerId: this.assignFieldOfficer.CustomerId,
      BranchId: this.assignFieldOfficer.BranchId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignFieldOfficerService.getSite(element).subscribe(
      (result: any) => {
        this.siteData = result.result;
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  clearAfterSave(): void {
    this.assignFieldOfficer = {
      EmployeeId: this.assignFieldOfficer.EmployeeId,
      CustomerId: 0,
      BranchId: 0,
      Site: {},
      CreatedBy: sessionStorage.getItem('UserID'),
    }
    this.areaData = [];
    this.siteData = [];
    this.assignFieldOfficer.Site = [];
  }


  onClear() {
    this.assignFieldOfficer = {
      EmployeeId: 0,
      CustomerId: 0,
      BranchId: 0,
      Site: {},
      CreatedBy: sessionStorage.getItem('UserID'),
    }
    this.assignFieldOfficer.Site = [];
    this.fieldOfficerData = [];
  }
}
