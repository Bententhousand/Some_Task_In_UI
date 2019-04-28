import { Component, OnInit } from '@angular/core';
import { AssignManpower } from '../../../models/assign-manpower/assign-manpower.model';
import { AssignManpowerService } from '../../../services/operation/assign-manpower.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-assign-manpower',
  templateUrl: './assign-manpower.component.html',
  styleUrls: ['./assign-manpower.component.css']
})
export class AssignManpowerComponent implements OnInit {

  viewFlag = true;
  isEditing = false;

  assignManpower: AssignManpower = {
    ContractId: 0,
    Customer: {},
    BranchId: 0,
    SiteId: 0,
    ClassificationId: 0,
    ServiceId: 0,
    CreatedBy: sessionStorage.getItem('UserID')
  }
  selectedManpower = [];
  // getAssignManpower: GetAssignManpower = {
  //   AllocationId: 0,
  //   ContractId: 0,
  //   CustomerId: 0,
  //   BranchId: 0,
  //   SiteId: 0,
  //   ClassificationId: 0,
  //   ServiceId: 0,
  //   NoofManpower: 0,
  //   CustomerName: "",
  //   BranchName: "",
  //   SiteName: "",
  //   ClassificationName: "",
  //   ServiceName: "",
  //   ManPowerId: 0,
  //   ManPowerName: "",
  // }
  customerData: any[] = [];
  areaData: any[] = [];
  siteData: any[] = [];
  assignManpowerData: any[] = [];
  serviceData: any[] = [];
  classificationData: any[] = [];
  manpowerData: any[] = [];

  constructor(private _assignManpowerService: AssignManpowerService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) { }

  ngOnInit() {
    debugger;
    this.getCustomers();
  }

  addAssignManpower(): void {
    debugger;
    var tempManpower = [];
    for (var i in this.selectedManpower) {
      var temp = {
        ManPowerId: this.selectedManpower[i].ManPowerId
      }
      tempManpower.push(temp);
    }
    let element = {
      ContractId: this.assignManpower.Customer.ContractId,
      CustomerId: this.assignManpower.Customer.CustomerId,
      BranchId: this.assignManpower.BranchId,
      SiteId: this.assignManpower.SiteId,
      ClassificationId: this.assignManpower.ClassificationId,
      ServiceId: this.assignManpower.ServiceId,
      ManPower: tempManpower,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.addAssignManpower(element).subscribe(
      (result: any) => {
        if (result.result === true) {
          this._confirmationDialogComponent.openAlertDialog("Successfully added");
          this.clearAfterSave();
          this.getAssignManpowers();
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

  removeAssignManpower(obj: any): void {
    debugger;
    let element = {
      AllocationId: obj.AllocationId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.removeAssignManpower(element).subscribe(
      (result: any) => {
        if (result.result) {
          this._confirmationDialogComponent.openAlertDialog("Successfully removed");
          this.clearAfterSave();
          this.getAssignManpowers();
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

  getCustomers(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getCustomers(element).subscribe(
      (result: any) => {
        this.customerData = result.result;
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
    let element = {
      CustomerId: this.assignManpower.Customer.CustomerId,
      ActionBy: "1004"
    }
    this._assignManpowerService.getArea(element).subscribe(
      (result: any) => {
        debugger;
        this.areaData = result.result;
        // this.clearOnChange('Branch');
        this.getAssignManpowers();
        this.siteData = [];
        this.classificationData = [];
        this.serviceData = [];
        this.manpowerData = [];
        this.assignManpower = {
          ContractId: 0,
          Customer: this.assignManpower.Customer,
          BranchId: 0,
          SiteId: 0,
          ClassificationId: 0,
          ServiceId: 0,
          CreatedBy: sessionStorage.getItem('UserID')
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

  getSite(): void {
    let element = {
      CustomerId: this.assignManpower.Customer.CustomerId,
      BranchId: this.assignManpower.BranchId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getSite(element).subscribe(
      (result: any) => {
        this.siteData = result.result;
        this.clearOnChange('Site');
        this.classificationData = [];
        this.serviceData = [];
        this.manpowerData = [];
        this.assignManpower = {
          ContractId: 0,
          Customer: this.assignManpower.Customer,
          BranchId: this.assignManpower.BranchId,
          SiteId: 0,
          ClassificationId: 0,
          ServiceId: 0,
          CreatedBy: sessionStorage.getItem('UserID')
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

  getClassification(): void {
    let element = {
      CustomerId: this.assignManpower.Customer.CustomerId,
      BranchId: this.assignManpower.BranchId,
      SiteId: this.assignManpower.SiteId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getClassification(element).subscribe(
      (result: any) => {
        this.classificationData = result.result;
        this.clearOnChange('Classification');
        this.serviceData = [];
        this.manpowerData = [];
        this.assignManpower = {
          ContractId: 0,
          Customer: this.assignManpower.Customer,
          BranchId: this.assignManpower.BranchId,
          SiteId: this.assignManpower.SiteId,
          ClassificationId: 0,
          ServiceId: 0,
          CreatedBy: sessionStorage.getItem('UserID')
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

  getService(): void {
    let element = {
      CustomerId: this.assignManpower.Customer.CustomerId,
      BranchId: this.assignManpower.BranchId,
      SiteId: this.assignManpower.SiteId,
      ClassificationId: this.assignManpower.ClassificationId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getService(element).subscribe(
      (result: any) => {
        this.serviceData = result.result;
        this.clearOnChange('Service');
        this.manpowerData = [];
        this.assignManpower = {
          ContractId: 0,
          Customer: this.assignManpower.Customer,
          BranchId: this.assignManpower.BranchId,
          SiteId: this.assignManpower.SiteId,
          ClassificationId: this.assignManpower.ClassificationId,
          ServiceId: 0,
          CreatedBy: sessionStorage.getItem('UserID')
        }
        console.log(this.serviceData);
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

  getManpower(): void {
    let element = {
      ServiceId: this.assignManpower.ServiceId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getManpower(element).subscribe(
      (result: any) => {
        this.manpowerData = result.result;
        console.log(this.manpowerData);
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

  getAssignManpowers(): void {
    let element = {
      CustomerId: this.assignManpower.Customer.CustomerId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._assignManpowerService.getAssignManpowers(element).subscribe(
      (result: any) => {
        debugger;
        this.assignManpowerData = result.result;
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

  clearOnChange(value) {
    this.assignManpower = {
      ContractId: 0,
      Customer: this.assignManpower.Customer,
      BranchId: 'Branch' != value ? this.assignManpower.BranchId : 0,
      SiteId: 'Site' != value ? this.assignManpower.SiteId : 0,
      ClassificationId: 'Classification' != value ? this.assignManpower.ClassificationId : 0,
      ServiceId: 'Service' != value ? this.assignManpower.ServiceId : 0,
      CreatedBy: sessionStorage.getItem('UserID')
    }
  }

  clearAfterSave(): void {
    this.assignManpower = {
      ContractId: 0,
      Customer: this.assignManpower.Customer,
      BranchId: 0,
      SiteId: 0,
      ClassificationId: 0,
      ServiceId: 0,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this.areaData = [];
    this.siteData = [];
    this.classificationData = [];
    this.serviceData = [];
    this.manpowerData = [];
  }

  onClear(): void {
    this.assignManpower = {
      ContractId: 0,
      Customer: {},
      BranchId: 0,
      SiteId: 0,
      ClassificationId: 0,
      ServiceId: 0,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this.areaData = [];
    this.siteData = [];
    this.classificationData = [];
    this.serviceData = [];
    this.manpowerData = [];
    this.assignManpowerData = [];
  }
}
