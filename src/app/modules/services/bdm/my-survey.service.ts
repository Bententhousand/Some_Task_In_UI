import { HeaderStorageService } from "./../../../shared/header-storage.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class MySurveyService {
  constructor(
    private _http: HttpClient,
    private _headerStorage: HeaderStorageService
  ) {}

  getSearchGridDetails(element) {
    return this._http
      .post<any>(
        // apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentDetailById",
        "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/GetBDMAppointmentDetailById",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getSurveyDetailsToEdit(element) {
    let getDetailsToEditParams = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: element.Id
    };

    return this._http
      .post(
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentDetailByClientId",
        getDetailsToEditParams
      )
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentDetailsByQuotationId(element) {
    let getParams = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: element.Id
    };
    return this._http
      .post(
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentQuotationById",
        getParams
      )
      .pipe(catchError(this.errorHandler));
  }

  getActiveServiceMaster() {
    let params = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: this._headerStorage.getUserId()
    };

    return this._http
      .post(apiUrl + "ServiceMaster/GetActiveServiceMaster", params)
      .pipe(catchError(this.errorHandler));
  }

  getAllStatus() {
    let params = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: this._headerStorage.getUserId()
    };

    return this._http
      .post(apiUrl + "StatusMaster/GetAllStatus", params)
      .pipe(catchError(this.errorHandler));
  }

  getAllStates() {
    let params = {
      ActionBy: this._headerStorage.getUserId()
    };

    return this._http
      .post(apiUrl + "StateMaster/GetAllStates", params)
      .pipe(catchError(this.errorHandler));
  }

  getAllCities() {
    let params = {
      ActionBy: this._headerStorage.getUserId()
    };

    return this._http
      .post(apiUrl + "CityMaster/GetAllCities", params)
      .pipe(catchError(this.errorHandler));
  }

  getAllReportByClientId(element) {
    let getParams = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: element.Id
    };
    return this._http
      .post(apiUrl + "BDMAppointmentReport/GetAllReportByClientId", getParams)
      .pipe(catchError(this.errorHandler));
  }

  getActiveStatus() {
    let params = {
      ActionBy: this._headerStorage.getUserId(),
      position: this._headerStorage.getPosition()
    };
    return this._http
      .post(apiUrl + "StatusMaster/GetActiveStatus", params)
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentDetailsByClientId(element) {
    let getParams = {
      ActionBy: this._headerStorage.getUserId(),
      ClientId: element.Id
    };
    return this._http
      .post(
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentDetailByClientId",
        getParams
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
