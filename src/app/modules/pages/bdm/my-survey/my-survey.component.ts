import { ConfirmationDialogComponent } from "./../../../../shared/confirmation-dialog/confirmation-dialog.component";
import { CityService } from "./../../../services/administrator/location/city.service";
import { StateService } from "./../../../services/administrator/location/state.serivce";
import { DatePipe, formatDate } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MySurveyService } from "../../../services/bdm/my-survey.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { HeaderStorageService } from "../../../../shared/header-storage.service";
import { DesignationService } from "../../../services/master/designation.service";
import { MatCheckbox } from "@angular/material";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-my-survey",
  templateUrl: "./my-survey.component.html",
  styleUrls: ["./my-survey.component.css"],
  providers: [DatePipe, HeaderStorageService],
  entryComponents: [ConfirmationDialogComponent]
})
export class MySurveyComponent implements OnInit {
  isFormOpen: boolean = false;
  isEditing: boolean = false;
  checkEditing: boolean = false;
  AppoinmentDetail: any = {};
  ServiceMasterList: any[] = [];
  DesignationMasterList: any[] = [];
  StateMasterList: any[] = [];
  CityMasterList: any[] = [];
  StatusList: any[] = [];
  allReportsList: any[] = [];
  selectedRowToEdit: any = {};
  requirementDetailsList: any[] = [];
  existingCompetitorsList: any[] = [];
  requirement: any = {};
  existCompetitor: any = {};
  ManPower = 0;
  ContractValue = 0;
  Position = this._headerStorage.getPosition()
    ? this._headerStorage.getPosition()
    : "3";
  @ViewChild("fileBrowser") fileBrowser: ElementRef;
  selectedFilesList: any[] = [];
  apiUrl = environment.apiUrl;

  objSearchParams = {
    searchEmployee: "",
    searchClient: "",
    searchCallType: "",
    FromDate: new Date(),
    ToDate: new Date()
  };

  surveyGridDetails: any[] = [];

  @ViewChild("existingCustomer") existingCompetitors: MatCheckbox;

  constructor(
    private _date: DatePipe,
    private _mySurvey: MySurveyService,
    private _headerStorage: HeaderStorageService,
    private _confirmationDialog: ConfirmationDialogComponent
  ) {}

  ngOnInit() {}

  onClickGoSearch() {
    let params = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      FromDate: this.objSearchParams.FromDate,
      ToDate: this.objSearchParams.ToDate,
      Id: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      Position: this._headerStorage.getPosition()
        ? this._headerStorage.getPosition()
        : "3",
      State: "1"
    };
    console.log(params);
    this._mySurvey.getSearchGridDetails(params).subscribe(
      res => {
        this.surveyGridDetails = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onEditRow(row) {
    this.clearAllExistingInputs();
    this.selectedRowToEdit = row;
    this.isFormOpen = !this.isFormOpen;
    this.isEditing = true;
    this.getBDMAppointmentDetailByClientId(row);
    this.getAppointmentQuotationById(row);
    this.getActiveServiceMaster();
    this.GetAllStatus();
    this.getAllStates();
    this.getAllCities();
    this.getAllReportByClientId(row);
    this.getActiveStatus();
  }

  getAppointmentQuotationById(row) {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      ClientId: row.Id
    };
    this._mySurvey.getAppointmentDetailsByQuotationId(element).subscribe(
      res => {
        console.log(res, "getAppointmentQuotationById");
      },
      err => {
        console.log(err);
      }
    );
  }

  getActiveServiceMaster() {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      Id: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001"
    };
    this._mySurvey.getActiveServiceMaster(element).subscribe(
      res => {
        console.log(res, "getActiveServiceMaster");
        this.ServiceMasterList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  GetAllStatus() {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      Id: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001"
    };
    this._mySurvey.getAllStatus(element).subscribe(
      res => {
        console.log(res, "GetAllStatus");
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllStates() {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001"
    };

    this._mySurvey.getAllStates(element).subscribe(
      res => {
        console.log(res, "getAllStates");
        this.StateMasterList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllCities() {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001"
    };

    this._mySurvey.getAllCities(element).subscribe(
      res => {
        console.log(res, "getAllCities");
        this.CityMasterList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllReportByClientId(row) {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      ClientId: row.Id
    };
    this._mySurvey.getAllReportByClientId(element).subscribe(
      res => {
        console.log(res, "getAllReportByClientId");
        this.allReportsList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getActiveStatus() {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      position: this._headerStorage.getPosition()
        ? this._headerStorage.getPosition()
        : "3"
    };

    this._mySurvey.getActiveStatus(element).subscribe(
      res => {
        console.log(res, "getActiveStatus");
        this.StatusList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getBDMAppointmentDetailByClientId(row) {
    let element = {
      ActionBy: this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001",
      ClientId: row.Id
    };

    this._mySurvey.getAppointmentDetailsByClientId(element).subscribe(
      res => {
        console.log(res, "getBDMAppointmentDetailByClientId");
        this.AppoinmentDetail = res.result;
        this.requirementDetailsList = this.AppoinmentDetail.BDMSurveyRequirement;
        this.existingCompetitorsList = this.AppoinmentDetail.surveyCompetitorsDetail;
        this.existingCompetitors.checked =
          this.existingCompetitorsList.length > 0 ? true : false;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveAppointMentReport() {
    let element = {
      Calltype: this.AppoinmentDetail.selectedCallHistoryStatus,
      Date: this.AppoinmentDetail.callHistoryDate,
      Remarks: this.AppoinmentDetail.callHistoryRemarks
    };
    let objAppoinmentReport = new FormData();
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      objAppoinmentReport.append("File[" + i + "]", this.selectedFilesList[i]);
    }
    objAppoinmentReport.append("data[0]", this.selectedRowToEdit.Id);
    objAppoinmentReport.append("data[1]", element.Date);
    objAppoinmentReport.append("data[2]", element.Calltype);
    objAppoinmentReport.append("data[3]", element.Remarks);
    objAppoinmentReport.append(
      "data[4]",
      this._headerStorage.getUserId() ? this._headerStorage.getUserId() : "1001"
    );
    this._mySurvey.addAppoinmentReport(objAppoinmentReport).subscribe(
      res => {
        console.log(res);
        this.getAllReportByClientId(this.selectedRowToEdit);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSelectedServiceChange() {
    let element = {
      Id: this.requirement.SelectedService
    };
    this._mySurvey.getDesignationListByServiceId(element).subscribe(
      res => {
        console.log(res);
        this.DesignationMasterList = res.result;
      },
      err => {
        console.log(err);
      }
    );
  }

  onAddRequirmentDetails() {
    let element = {
      Service: this.requirement.SelectedService,
      ServiceName: this.ServiceMasterList[
        this.ServiceMasterList.findIndex(
          e => e.Id === this.requirement.SelectedService
        )
      ].Name,
      Designation: this.requirement.SelectedDesignation,
      DesignationName: this.DesignationMasterList[
        this.DesignationMasterList.findIndex(
          d => d.Id === this.requirement.SelectedDesignation
        )
      ].Name,
      RatePerEmployee: this.requirement.RatePerEmployee,
      EmployeeCount: this.requirement.EmployeeCount,
      Total: +this.requirement.RatePerEmployee * +this.requirement.EmployeeCount
    };
    this.requirementDetailsList.push(element);
    this.requirement = {};
  }

  onRemoveRequirementDetail(index: number) {
    this.requirementDetailsList.splice(index, 1);
  }

  onAddCompetitor() {
    this.existCompetitor.Total =
      +this.existCompetitor.RatePerEmployee *
      +this.existCompetitor.EmployeeCount;
    this.ManPower += +this.existCompetitor.EmployeeCount;
    this.ContractValue += +this.existCompetitor.Total;
    let element = Object.assign({}, this.existCompetitor);
    this.existingCompetitorsList.push(element);
    this.existCompetitor = {};
  }

  onRemoveCompetitor(index: number) {
    this.ManPower -= this.existingCompetitorsList[index].EmployeeCount;
    this.ContractValue -= this.existingCompetitorsList[index].Total;
    this.existingCompetitorsList.splice(index, 1);
  }

  onFileSelected(event) {
    if (event.target.files.length > 10) {
      this._confirmationDialog.openAlertDialog(
        "You can select only 10 files",
        "My Survey"
      );
      this.fileBrowser.nativeElement.value = "";
    } else {
      this.selectedFilesList = event.target.files;
    }
  }

  saveAppointmentDetail() {
    this.requirementDetailsList.forEach(rec => {
      rec.CreatedBy = this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001";
    });
    this.existingCompetitorsList.forEach(rec => {
      rec.CreatedBy = this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001";
    });
    this.AppoinmentDetail.EmployeeId = this._headerStorage.getUserId()
      ? this._headerStorage.getUserId()
      : "1001";
    this.AppoinmentDetail.RequirementDetail = this.requirementDetailsList;
    this.AppoinmentDetail.Competitor = this.existingCompetitorsList;
    this.AppoinmentDetail.ExistCompetitors = this.existingCompetitors.checked;
    this.AppoinmentDetail.State = this.AppoinmentDetail.StateId;
    this.AppoinmentDetail.City = this.AppoinmentDetail.CityId;
    this.AppoinmentDetail.ExpectedConfirmationDate = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "en-IN"
    );
    if (!this.isEditing) {
      this.AppoinmentDetail.CreatedBy = this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001";
      console.log(this.AppoinmentDetail);
      this._mySurvey.addBDMAppointmentDetails(this.AppoinmentDetail).subscribe(
        res => {
          console.log(res);
          this.afterSaveOrUpdate();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.AppoinmentDetail.Id = this.selectedRowToEdit.Id;
      this.AppoinmentDetail.ModifiedBy = this._headerStorage.getUserId()
        ? this._headerStorage.getUserId()
        : "1001";
      console.log(this.AppoinmentDetail);
      this._mySurvey
        .updateBDMAppointmentDetails(this.AppoinmentDetail)
        .subscribe(
          res => {
            console.log(res);
            this.afterSaveOrUpdate();
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  afterSaveOrUpdate() {
    this.isFormOpen = false;
    this.isEditing = false;
    this.clearAllExistingInputs();
  }

  clearAllExistingInputs() {
    this.AppoinmentDetail = {};
    this.requirementDetailsList = [];
    // this.existingCompetitors.checked = false;
    this.AppoinmentDetail.ExistCompetitors = false;
    this.DesignationMasterList = [];
    this.CityMasterList = [];
    this.ServiceMasterList = [];
    this.StateMasterList = [];
    this.StatusList = [];
    this.allReportsList = [];
    this.existingCompetitorsList = [];
    this.requirement = {};
    this.objSearchParams = {
      searchEmployee: "",
      searchClient: "",
      searchCallType: "",
      FromDate: new Date(),
      ToDate: new Date()
    };
    this.surveyGridDetails = [];
    this.selectedRowToEdit = {};
  }

  addBdmAppointment() {
    this.isEditing = false;
    this.isFormOpen = true;
    this.clearAllExistingInputs();
    this.getActiveServiceMaster();
    this.GetAllStatus();
    this.getAllStates();
    this.getAllCities();
    this.getActiveStatus();
  }

  Cancel() {
    this.isFormOpen = false;
    this.isEditing = false;
    this.clearAllExistingInputs();
  }
}
