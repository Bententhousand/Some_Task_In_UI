import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable()
export class TargetSettingService {
    clearAll(): any {
        throw new Error("Method not implemented.");
    }
    token: any;
    constructor(private http: HttpClient) {
        debugger;
        this.token = localStorage.getItem('Token');
    }


    getAllEmployeeByReportTo(element) {
        return this.http
            .post(API_URL + "Target/GetAllEmployeeByReportTo", element)
            .pipe(catchError(this.handleError));
    }


    getDetailByMonth(element) {
        return this.http
            .post(API_URL + "Target/GetAllEmployeeByMonth", element)
            .pipe(catchError(this.handleError));
    }

    getByEmployeeTarget(element) {
        return this.http
            .post(API_URL + "Target/GetAllTargetGraphByEmployeeId", element)
            .pipe(catchError(this.handleError));
    }

    getTargetForGrid(element) {
        return this.http
            .post(API_URL + "Target/GetAllTargetforGrid", element)
            .pipe(catchError(this.handleError));
    }
    getTargetForGridByEmployeeId(element) {
        return this.http
            .post(API_URL + "Target/GetAllTargetByEmployeeId", element)
            .pipe(catchError(this.handleError));
    }

    AddEmployeeTarget(element) {
        return this.http
            .post(API_URL + "Target/CreateTarget", element)
            .pipe(catchError(this.handleError));
    }

    getAllTargets(element) {
        return this.http
            .post(API_URL + "Target/GetAllTarget", element)
            .pipe(catchError(this.handleError));
    }
   getMyTarget(element) {
        return this.http
            .post(API_URL + "Target/GetAllTargetGraph", element)
            .pipe(catchError(this.handleError));
    }
 

    RemoveEmployeeTarget(element) {
        return this.http
            .post(API_URL + "Target/RemoveTarget", element)
            .pipe(catchError(this.handleError));
    }

    getMyTargetList(element) {
        return this.http
            .post(API_URL + "Target/GetMyTargetList", element)
            .pipe(catchError(this.handleError));
    }

    getAllEmployee(element) {
        return this.http
            .post(API_URL + "Employee/GetAllEmployees", element)
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}