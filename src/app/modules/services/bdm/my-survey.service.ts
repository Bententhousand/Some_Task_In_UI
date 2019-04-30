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
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentDetailById",
        // "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/GetBDMAppointmentDetailById",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentDetailsByQuotationId(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/GetBDMAppointmentQuotationById",
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentQuotationById",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getActiveServiceMaster(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/ServiceMaster/GetActiveServiceMaster",
        apiUrl + "ServiceMaster/GetActiveServiceMaster",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAllStatus(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/StatusMaster/GetAllStatus",
        apiUrl + "StatusMaster/GetAllStatus",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAllStates(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/StateMaster/GetAllStates",
        apiUrl + "StateMaster/GetAllStates",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAllCities(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/CityMaster/GetAllCities",
        apiUrl + "CityMaster/GetAllCities",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAllReportByClientId(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppointmentReport/GetAllReportByClientId",
        apiUrl + "BDMAppointmentReport/GetAllReportByClientId",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getActiveStatus(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/StatusMaster/GetActiveStatus",
        apiUrl + "StatusMaster/GetActiveStatus",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentDetailsByClientId(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/GetBDMAppointmentDetailByClientId",
        apiUrl + "BDMAppoinmentDetail/GetBDMAppointmentDetailByClientId",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  addAppoinmentReport(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppointmentReport/CreateBDMAppointmentReport",
        apiUrl + "BDMAppointmentReport/CreateBDMAppointmentReport",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  getDesignationListByServiceId(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/Designation/GetDesignationByStatusId",
        apiUrl + "Designation/GetDesignationByStatusId",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  addBDMAppointmentDetails(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/CreateBDMAppointmentDetail",
        apiUrl + "Designation/GetDesignationByStatusId",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  updateBDMAppointmentDetails(element) {
    return this._http
      .post<any>(
        // "http://35.162.203.7/FMSApi/api/BDMAppoinmentDetail/UpdateBDMAppointmentDetail",
        apiUrl + "Designation/GetDesignationByStatusId",
        element
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
