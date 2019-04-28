import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator, MatTableDataSource, ErrorStateMatcher } from "@angular/material";
import { DatePipe } from "@angular/common";
import { ContractMasterService } from "../../../services/customer/contract-master.service";
import { ConfirmationDialogComponent } from "../../../../shared/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.css"],
  providers: [DatePipe]

})
export class ContractComponent implements OnInit {

  constructor(private _contractMasterService: ContractMasterService,
    private _date: DatePipe,
    private _confirmationDialogComponent: ConfirmationDialogComponent
  ) { }

  viewFlag = true;
  StartDate = new Date();
  EndDate = new Date();
  isEditing = false;
  CustomerData: any[] = [];
  FilterCustomerData: any[] = [];
  SetCustomerData: any[] = [];
  AllCustomerData: any[] = [];
  contractDetail: any = {
    CustomerId: "",
    StartDate: new Date(),
    EndDate: new Date(),
    CreatedBy: sessionStorage.getItem('UserID'),
    modifiedBy: sessionStorage.getItem('UserID'),
    Active: true
  };
  UnchangecontractDetail: any = {
    CustomerId: "",
    StartDate: new Date(),
    EndDate: new Date(),
    CreatedBy: sessionStorage.getItem('UserID'),
  };

  UpdatecontractDetail: any = {
    CustomerId: "",
    StartDate: new Date(),
    EndDate: new Date(),
    modifiedBy: sessionStorage.getItem('UserID'),
    Active: true
  };
  displayedColumns: string[] = [
    "CustomerId",
    "CustomerName",
    "StartDate",
    "EndDate",
    "TotalAmount",
    "Active",
    "action"
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;



  ngOnInit() {
    this.getAllCustomers();
    this.LoadContractMaster();
  }

  LoadContractMaster(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    this._contractMasterService.getAllContract(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.CustomerData = result.result;
        this.matTableConfig(this.CustomerData);
        this.SetCustomerData = this.CustomerData;
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

  matTableConfig(tableRecords: any): void {
    this.dataSource = new MatTableDataSource(tableRecords);
    this.dataSource.paginator = this.tablePaginator;
  }

  editContractDetails(modifyContract): void {
    debugger;
    this.contractDetail = modifyContract;
    this.viewFlag = !this.viewFlag;
    this.isEditing = true;
  }

  addContractDetails(): void {
    debugger;
    if (this.contractDetail.CustomerId != '') {
      this.contractDetail.StartDate = this._date.transform(this.contractDetail.StartDate, 'yyyy-MM-dd');
      this.contractDetail.EndDate = this._date.transform(this.contractDetail.EndDate, 'yyyy-MM-dd');
      if (!this.isEditing) {
        this._contractMasterService.addContract(this.contractDetail).subscribe(
          (result: any) => {
            if (result.result === true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully added");
              this.ngOnInit();
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
        this._contractMasterService.modifyContract(this.contractDetail).subscribe(
          (result: any) => {
            if (result.result === true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully modified");
              this.ngOnInit();
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
      this._confirmationDialogComponent.openAlertDialog("Select Customer Name");
    }
  }

  searchId(searchValue: any) {
    debugger;
    searchValue = searchValue.trim();
    searchValue = searchValue.toLocaleLowerCase();
    this.FilterCustomerData = this.SetCustomerData.filter(
      data => data.CustomerId.toString().toLocaleLowerCase().startsWith(
        searchValue.toLocaleLowerCase()
      )
    );
    this.CustomerData = this.FilterCustomerData;
    this.matTableConfig(this.CustomerData);
  }

  searchName(searchValue: any) {
    debugger;
    searchValue = searchValue.trim();
    searchValue = searchValue.toLocaleLowerCase();
    this.FilterCustomerData = this.SetCustomerData.filter(
      data => data.CustomerName.toLocaleLowerCase().startsWith(
        searchValue.toLocaleLowerCase()
      )
    );
    this.CustomerData = this.FilterCustomerData;
    this.matTableConfig(this.CustomerData);
  }

  searchDate(searchValue: any) {
    debugger;
    searchValue = searchValue.trim();
    searchValue = searchValue.toLocaleLowerCase();
    this.FilterCustomerData = this.SetCustomerData.filter(
      data => data.StartDate.toLocaleLowerCase().startsWith(
        searchValue.toLocaleLowerCase()
      )
    );
    this.CustomerData = this.FilterCustomerData;
    this.matTableConfig(this.CustomerData);
  }

  searchAmount(searchValue: any) {
    debugger;
    searchValue = searchValue.trim();
    searchValue = searchValue.toLocaleLowerCase();
    this.FilterCustomerData = this.SetCustomerData.filter(
      data => data.TotalAmount.toString().toLocaleLowerCase().startsWith(
        searchValue.toLocaleLowerCase()
      )
    );
    this.CustomerData = this.FilterCustomerData;
    this.matTableConfig(this.CustomerData);
  }

  removeContractDetail(element): void {
    debugger
    let deleteElement = {
      Id: element.Id,
      Active: element.Active,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._contractMasterService.removeContract(deleteElement).subscribe(
      (result: any) => {
        if (result.result == true) {
          this._confirmationDialogComponent.openAlertDialog("Remove Successfully");
          this.LoadContractMaster();
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

  getAllCustomers(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    this._contractMasterService.getAllSuccessCustomer(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.AllCustomerData = result.result;
        console.log(this.AllCustomerData);
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

  onNewClick() {
    this.viewFlag = !this.viewFlag;
  }

  resetScreen(): void {
    this.contractDetail = Object.assign({}, this.UnchangecontractDetail);
    this.viewFlag = !this.viewFlag;
  }
}
