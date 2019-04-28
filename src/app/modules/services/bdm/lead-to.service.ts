import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


const API_URL = environment.apiUrl;

@Injectable()
export class LeadToService {
    clearAll(): any {
        throw new Error("Method not implemented.");
    }
    token: any;
    constructor(private http: HttpClient) {
        debugger;
        this.token = localStorage.getItem('Token');
    }
 
    getService(element) {
        return this.http
            .post(API_URL + "ServiceMaster/GetAllServices", element)
            .pipe(catchError(this.handleError));
    } 

    getOldLeadList(element) {
        return this.http
            .post(API_URL + "ClientLeadChange/GetOldEmployeeList", element)
            .pipe(catchError(this.handleError));
    } 
    
    
    getNewLeadList(element) {
        return this.http
            .post(API_URL + "ClientLeadChange/GetNewEmployeeList", element)
            .pipe(catchError(this.handleError));
    } 
    
    getClientByEmpId(element) {
        return this.http
            .post(API_URL + "ClientLeadChange/GetAllClientByEmployee", element)
            .pipe(catchError(this.handleError));
    } 
    
     
    saveChangeLead(element) {
        return this.http
            .post(API_URL + "ClientLeadChange/ChangeLead", element)
            .pipe(catchError(this.handleError));
    } 
 
    
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}