import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class DesignationService {

    constructor(private _httpClient: HttpClient) { }

    saveDesignationDetail(element) {
        return this._httpClient
            .post(API_URL + "Designation/Create", element)
            .pipe(catchError(this.handleError));
    }

    // saveDesignationDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'Designation/Create', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    updateDesignationDetail(element) {
        return this._httpClient
            .put(API_URL + "Designation/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateDepartmentDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'Designation/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    listDesignationDetailsByDeptId(element) {
        return this._httpClient
            .get(API_URL + "Designation/GetDesigByDepId/" + element)
            .pipe(catchError(this.handleError));
    }

    // listDesignationDetailsByDeptId(element): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Designation/GetDesigByDepId/' + element;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    listDesignationDetails(element) {
        return this._httpClient
            .get(API_URL + "Designation/AllDesignations/" + element)
            .pipe(catchError(this.handleError));
    }

    // listDesignationDetails(element): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Designation/AllDesignations/' + element;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    
    deleteDepartmentDetail(id) {
        return this._httpClient
            .get(API_URL + "Designation/Delete/" + id)
            .pipe(catchError(this.handleError));
    }

    // deleteDepartmentDetail(id) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Designation/Delete/' + id;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
