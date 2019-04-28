import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerSiteMappingService } from '../../../services/customer/customer-site-mapping.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-customer-site-mapping',
  templateUrl: './customer-site-mapping.component.html',
  styleUrls: ['./customer-site-mapping.component.css',],

})
export class CustomerSiteMappingComponent implements OnInit {

  ClassData: any[] = [];
  constructor(private _siteMappingService: CustomerSiteMappingService,
    private _confirmationDialogComponent: ConfirmationDialogComponent
) { }
 
  CustomerData: any[] = [];
  BranchData: any[] = [];
  SiteData: any[] = [];
  ngOnInit() {
    this.getAllCustomers();
    //  this.getAllBranch();
    //  this.getAllSite();
  }
  addBranch: any = {
    CustomerId: 0,
    Branch: '',
    ContactPerson: '',
    ContactNumber: '',
    Email: '',
    CreatedBy: '',
  }
  addSite: any = {
    CustomerId: 0,
    BranchId: 0,
    Site: '',
    ContactPerson: '',
    ContactNumber: '',
    Email: '',
    Address: '',
    CreatedBy: '',
  }
  addClassification: any = {
    CustomerId: 0,
    BranchId: 0,
    SiteId: 0,
    Classfication: '',
    CreatedBy: '',
  }

  AddSite(): void {
    debugger;
    if (this.checkSiteValidation()) {
      this.addAllSite();
    }
  }

  checkSiteValidation(): boolean {
    if (this.addSite.BranchId === 0) {
      this._confirmationDialogComponent.openAlertDialog("Select Branch Name");
      return false;
    } else if (this.addSite.Site === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Site");
      return false;
    } else if (this.addSite.ContactPerson === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Contact Person");
      return false;
    }
    else if (this.addSite.ContactNumber === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Contact No");
      return false;
    }
    else if (this.addSite.Email === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Email");
      return false;
    } else {
      return true;
    }
  }

  addAllSite() {
    let addSiteDetails = {
      CustomerId: this.addBranch.CustomerId,
      BranchId: this.addSite.BranchId,
      Site: this.addSite.Site,
      ContactPerson: this.addSite.ContactPerson,
      ContactNumber: this.addSite.ContactNumber,
      Email: this.addSite.Email,
      Address: this.addSite.Address,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.addSite(addSiteDetails).subscribe((result: any) => {
      debugger;
      if (result.result === true) {
        this._confirmationDialogComponent.openAlertDialog("Successfully added");
        this.getAllSite();
      }
    }, (error) => {
      console.log(error);
    })
  }


  AddBranch(): void {
    debugger;
    if (this.checkValidation()) {
      this.addAllBranch();
    }
  }

  checkValidation(): boolean {
    if (this.addBranch.CustomerId === 0) {
      this._confirmationDialogComponent.openAlertDialog("Enter Customer Name");
      return false;
    } else if (this.addBranch.Branch === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Branch");
      return false;
    } else if (this.addBranch.ContactPerson === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Contact Person");
      return false;
    }
    else if (this.addBranch.ContactNumber === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Contact No");
      return false;
    }
    else if (this.addBranch.Email === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Email");
      return false;
    } else {
      return true;
    }
  }


  addAllBranch() {
    let addBranchDetails = {
      CustomerId: this.addBranch.CustomerId,
      Branch: this.addBranch.Branch,
      ContactPerson: this.addBranch.ContactPerson,
      ContactNumber: this.addBranch.ContactNumber,
      Email: this.addBranch.Email,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.addBranch(addBranchDetails).subscribe((result: any) => {
      debugger;
      if (result.result === true) {
        this._confirmationDialogComponent.openAlertDialog("Successfully added");
        this.getAllBranch();
      }
    }, (error) => {
      console.log(error);
    })
  }

  AddClassification(): void {
    debugger;
    if (this.checkClsValidation()) {
      this.addAllClassification();
    }
  }

  checkClsValidation(): boolean {
    if (this.addClassification.BranchId === 0) {
      this._confirmationDialogComponent.openAlertDialog("Select Branch");
      return false;
    } else if (this.addClassification.SiteId === 0) {
      this._confirmationDialogComponent.openAlertDialog("Select Site");
      return false;
    }
    else if (this.addClassification.Classfication === '') {
      this._confirmationDialogComponent.openAlertDialog("Enter Classification");
      return false;
    } else {
      return true;
    }
  }


  addAllClassification() {
    let addClassDetails = {
      CustomerId: this.addBranch.CustomerId,
      BranchId: this.addClassification.BranchId,
      SiteId: this.addClassification.SiteId,
      Classfication: this.addClassification.Classfication,
      CreatedBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.addClassification(addClassDetails).subscribe((result: any) => {
      debugger;
      if (result.result === true) {
        this._confirmationDialogComponent.openAlertDialog("Successfully added");
        this.getAllClassification();
      }
    }, (error) => {
      console.log(error);
    })
  }
  getAllCustomers(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.getCustomer(element).subscribe(
      (result: any) => {
        debugger;
        this.CustomerData = result.result;
        console.log(this.CustomerData);
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

  getAllBranch(): void {
    debugger;
    this.BranchData = [];
    this.addSite = {};
    this.clearBranch();
    this.addClassification = {};
    let element = {
      CustomerId: this.addBranch.CustomerId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.getBranch(element).subscribe(
      (result: any) => {
        debugger;
        this.BranchData = result.result;
        console.log(this.BranchData);
        this.SiteData = [];
        this.ClassData = [];
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

  clearBranch() {
    this.addBranch = {
      CustomerId: this.addBranch.CustomerId,
      Branch: "",
      ContactPerson: "",
      ContactNumber: "",
      Email: ""
    };
  }

  getAllSite(): void {
    debugger;
    this.SiteData = [];
    this.addClassification = {};
    this.clearSite();
    let element = {
      CustomerId: this.addBranch.CustomerId,
      BranchId: this.addSite.BranchId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.getSite(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.SiteData = result.result;
        console.log(this.SiteData);
        this.ClassData = [];
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

  clearSite() {
    this.addSite = {
      BranchId: this.addSite.BranchId,
      Site: "",
      ContactPerson: "",
      ContactNumber: "",
      Email: "",
      Address: ""
    };
  }

  getAllClassification(): void {
    debugger;
    this.clearClassification();
    let element = {
      CustomerId: this.addBranch.CustomerId,
      BranchId: this.addClassification.BranchId,
      SiteId: this.addClassification.SiteId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.getClassification(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.ClassData = result.result;
        console.log(this.ClassData);
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

  clearClassification() {
    this.addClassification = {
      BranchId: this.addSite.BranchId,
      SiteId: this.addClassification.SiteId,
      Classfication: "",
    };
  }

  removeClassification(element): void {
    debugger;
    let deleteElement = {
      Id: element.ClassificationId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.removeClassification(deleteElement).subscribe(
      (result: any) => {
        if (result.result == true) {         
          this.getAllClassification();
          this._confirmationDialogComponent.openAlertDialog("Remove Successfully");
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
  removeBranch(element): void {
    let deleteElement = {
      Id: element.Id,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.removeBranch(deleteElement).subscribe(
      (result: any) => {
        if(result.result == true) {         
          this.getAllBranch();
          this._confirmationDialogComponent.openAlertDialog("Remove Successfully");
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
  removeSite(element): void {
    debugger;
    let deleteElement = {
      Id: element.SiteId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._siteMappingService.removeSite(deleteElement).subscribe(
      (result: any) => {
        if(result.result == true) {         
          this.getAllSite();
          this._confirmationDialogComponent.openAlertDialog("Remove Successfully");
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
