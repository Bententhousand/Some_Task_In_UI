import { CityService } from "./../../../services/administrator/location/city.service";
import { StateService } from "./../../../services/administrator/location/state.serivce";
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MySurveyService } from "../../../services/bdm/my-survey.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { HeaderStorageService } from "../../../../shared/header-storage.service";

@Component({
  selector: "app-my-survey",
  templateUrl: "./my-survey.component.html",
  styleUrls: ["./my-survey.component.css"],
  providers: [DatePipe, HeaderStorageService]
})
export class MySurveyComponent implements OnInit {
  isFormOpen: boolean = false;
  isEditing: boolean = false;
  checkEditing: boolean = false;
  AppoinmentDetail: any = {};
  requirement: any = {};
  existingRequirement: any = {};
  ServiceMasterList: any[] = [];
  DesignationMasterList: any[] = [];
  StateMasterList: any[] = [];
  CityMasterList: any[] = [];

  objSearchParams = {
    searchEmployee: "",
    searchClient: "",
    searchCallType: "",
    FromDate: new Date(),
    ToDate: new Date()
  };

  surveyGridDetails: any[] = [];

  constructor(
    private _date: DatePipe,
    private _mySurvey: MySurveyService,
    private _state: StateService,
    private _city: CityService,
    private _headerStorage: HeaderStorageService
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

  getStates() {
    this._state.listStateDetails().subscribe(
      res => {
        // this.StateMasterList = <any[]>res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCity() {
    this._city.listCityDetails().subscribe(
      res => {
        this.CityMasterList = <any[]>res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEditRow(row) {
    this._mySurvey.getSurveyDetailsToEdit(row).subscribe(
      res => {
        this.AppoinmentDetail = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  addBdmAppointment() {
    this.isFormOpen = true;
    this.isEditing = false;
  }

  Cancel() {
    this.isFormOpen = false;
    this.isEditing = false;
  }
}
