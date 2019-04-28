import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ManpowerDetailService {

  constructor(private _httpClient: HttpClient) { }

  addManpowerPersonalWithPhoto(element?): Observable<string> {
    debugger;
    return this._httpClient.post<string>(API_URL + "Manpower/CreateManpowerDetils", element)
      .pipe(catchError(this.handleError));
  }

  modifyManpowerPersonalWithPhoto(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "Manpower/UpdateManpowerDetils", element)
      .pipe(catchError(this.handleError));
  }

  addManpowerPersonal(element?): Observable<string> {
    debugger;
    return this._httpClient.post<string>(API_URL +"Manpower/CreateManPower", element)
      .pipe(catchError(this.handleError));
  }

  modifyManpowerPersonal(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL +"Manpower/UpdateManPower", element)
      .pipe(catchError(this.handleError));
  }

  addManpowerVerificationWithProofUrl(element?): Observable<string> {
    debugger;
    return this._httpClient.post<string>(API_URL +"Manpower/VerifyProofDetils", element)
      .pipe(catchError(this.handleError));
  }

  addManpowerVerification(element?): Observable<string> {
    debugger;
    return this._httpClient.post<string>(API_URL +"Manpower/CreateProofDetail", element)
      .pipe(catchError(this.handleError));
  }

  // modifyManpowerVerification(element?): Observable<string> {
  //   return this._httpClient.post<string>("Manpower/ModifyTestingMethod", element)
  //     .pipe(catchError(this.handleError));
  // }

  addManpowerFamily(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "Manpower/CreateManpowerFamily", element)
      .pipe(catchError(this.handleError));
  }

  // modifyManpowerFamily(element?): Observable<string> {
  //   return this._httpClient.post<string>("Manpower/ModifyTestingMethod", element)
  //     .pipe(catchError(this.handleError));
  // }

  addManpowerBank(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL +"Manpower/CreateManpowerBankDetails", element)
      .pipe(catchError(this.handleError));
  }

  modifyManpowerBank(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL +"Manpower/ModifyTestingMethod", element)
      .pipe(catchError(this.handleError));
  }

  removeVerification(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL +"Manpower/RemoveManpowerVerify", element)
      .pipe(catchError(this.handleError));
  }

  removeFamily(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "Manpower/RemoveManpowerFamily", element)
      .pipe(catchError(this.handleError));
  }

  removeBank(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "Manpower/RemoveManpowerBank", element)
      .pipe(catchError(this.handleError));
  }

  getAllManpowerDetails(element): Observable<any> {
    return this._httpClient.post<any>(API_URL +"Manpower/GetAllManPowerMaster",element)
      .pipe(catchError(this.handleError));
  }

  getManpowerVerification(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetVerifyDetail", element)
      .pipe(catchError(this.handleError));
  }

  // getManpowerFamily(): Observable<any> {
  //   return this._httpClient.get<any>("Manpower/TestingMethod")
  //     .pipe(catchError(this.handleError));
  // }

  // getManpowerBank(): Observable<any> {
  //   return this._httpClient.get<any>("Manpower/TestingMethod")
  //     .pipe(catchError(this.handleError));
  // }

  getBloodGroupMaster(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "Manpower/TestingMethod")
      .pipe(catchError(this.handleError));
  }

  getCityMaster(element): Observable<any> {
    return this._httpClient.get<any>(API_URL + "City/GetCityByStateId/" + element)
      .pipe(catchError(this.handleError));
  }

  getCompany(): Observable<any> {
    debugger;
    return this._httpClient.get<any>(API_URL + "Company/AllCompany")
      .pipe(catchError(this.handleError));
  }

  getDesignation(element): Observable<any> {
    return this._httpClient.get<any>(API_URL + "Designation/AllDesignations/" + element)
      .pipe(catchError(this.handleError));
  }

  getStateMaster(): Observable<any> {
    return this._httpClient.get<any>( API_URL + "State/AllState")
      .pipe(catchError(this.handleError));
  }

  getPayment(): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetAllPayment",{})
      .pipe(catchError(this.handleError));
  }

  getProofMaster(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetProofMaster",element)
      .pipe(catchError(this.handleError));
  }

  getAllBank(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetAllBankNameList",element)
      .pipe(catchError(this.handleError));
  }

  getAllAccountType(): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetAllAccountType",{})
      .pipe(catchError(this.handleError));
  }

  getFamilyDetails(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetManpowerFamily",element)
      .pipe(catchError(this.handleError));
  }

  getAllBankDetails(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Manpower/GetManpowerBankDetails",element)
      .pipe(catchError(this.handleError));
  }

  searchManpower(element): Observable<string> {
    debugger;
    return this._httpClient.post<string>(API_URL +"Manpower/SearchManpower", element)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
