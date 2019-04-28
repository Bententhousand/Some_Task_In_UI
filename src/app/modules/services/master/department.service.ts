import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { LocalStorage } from '../../../shared/local-storage';

const API_URL = environment.apiUrl;

@Injectable()
export class DepartmentService {

    constructor(private _httpClient: HttpClient, private _headerStorage: LocalStorage) { }

    saveDepartmentDetail(element) {
        return this._httpClient
            .post(API_URL + "Department/Create", element)
            .pipe(catchError(this.handleError));
    }

    //   saveDepartmentDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'Department/Create', element, { headers: headers }).map(response => {
    //       return response;
    //     }).catch(
    //       this.handleError
    //     );
    //   }


    updateDepartmentDetail(element) {
        return this._httpClient
            .put(API_URL + "Department/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateDepartmentDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'Department/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    deleteDepartmentDetail(id) {
        return this._httpClient
            .delete(API_URL + "Department/Delete/" + id)
            .pipe(catchError(this.handleError));
    }

    // deleteDepartmentDetail(id) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Department/Delete/' + id;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    listCompanyInitiation() {
        return this._httpClient
            .get(API_URL + "Company/AllCompany")
            .pipe(catchError(this.handleError));
    }

    // listCompanyInitiation(): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Company/AllCompany';
    //     return this._httpClient.get(dataUrl, { headers: headers })
    // }

    listDepartmentDetails(element) {
        return this._httpClient
            .get(API_URL + "Department/AllDepartments/" + element)
            .pipe(catchError(this.handleError));
    }

    // listDepartmentDetails(element): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Department/AllDepartments/' + element;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    listDepartmentDetailsByCompanyId(element) {
        return this._httpClient
            .get(API_URL + "Department/AllDepartments/" + element)
            .pipe(catchError(this.handleError));
    }

    // listDepartmentDetailsByCompanyId(id): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Department/AllDepartments' + id;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    listParentDepartmentDetails(element) {
        return this._httpClient
            .post(API_URL + "Department/GetDepOfParentCompanies", element)
            .pipe(catchError(this.handleError));
    }

    // listParentDepartmentDetails(): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Department/GetDepOfParentCompanies';
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    //   setDepartmentVal(value: any = []) {
    //     this.DepartmentDetails = value;
    //   }

    //   getDepartmentVal() {
    //     debugger;
    //     return this.DepartmentDetails;
    //   }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
