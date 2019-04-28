import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable()
export class LoginService {
    debugger;
    Username: any;
    userid: any;
    data: any;
    token: any;
    MenuList: any;
    loggedUser: any;
    SelectedCompany: any;
    selectedCompanyName: any;
    isAuth: any;
    constructor(private _httpClient: HttpClient) {
    }


    login(obj): Observable<any> {
        debugger;
        const body = JSON.stringify({ UserName: obj.Username, Password: obj.password });
        return this._httpClient.post<any>(API_URL + 'login ', { UserName: obj.Username, Password: obj.password },
            {
                headers: new HttpHeaders().set('Authorization', 'Basic ' +
                    btoa(obj.Username + ":" + obj.password)), observe: 'response'
            }).do(response => {
                debugger;
                if (response.status == 200) {
                    this.data = response.headers.get('UserId');
                    this.isAuth = true;
                    localStorage.setItem('UserID', this.data);
                    sessionStorage.setItem('UserID', this.data);

                    this.token = response.headers.get('Token');
                    this.isAuth = true;
                    localStorage.setItem('Token', this.token);
                    sessionStorage.setItem('Token', this.token);

                    localStorage.setItem('isAuth', this.isAuth);
                    sessionStorage.setItem('isAuth', this.isAuth);
                    return response;
                }
            }, (error: HttpErrorResponse) => {
                console.log(error);
                return error;
            });
    }

    getMenus(element): Observable<string> {
        debugger;
        return this._httpClient.get<string>(API_URL + "UserMenuMapping/GetMenuMappingByUserId/" + element)
            .pipe(catchError(this.handleError));
    }

    getUserDetail(element): Observable<any> {
        debugger;
        return this._httpClient.get<any>(API_URL + "User/GetUserById/" + element)
            .pipe(catchError(this.handleError));
    }

    getLoggedUserDetails(): Observable<string> {
        debugger;
        return this._httpClient.get<string>(API_URL + "UserMenuMapping/GetMenuMappingByUserId/")
            .pipe(catchError(this.handleError));
    }


    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }



    // User(userID) {
    //     debugger;
    //     return this.http.get(configuration.url + 'User/GetUserById/' + userID).map((res: Response) => {
    //         console.log(res)
    //         return res;

    //     });
    // }
    // getLoggedUserDetails() {
    //     this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUserDetails')) || JSON.parse(localStorage.getItem('loggedUserDetails'));
    //     this.Username = (this.loggedUser) ? this.loggedUser.FirstName : "";
    //     if (this.loggedUser) {
    //         this.selectedCompanyName = (this.loggedUser.SelectedCompany !== null && this.loggedUser.SelectedCompany !== undefined) ?
    //             this.loggedUser.SelectedCompany.CompanyName : "";
    //     }
    //     return this.loggedUser;
    // }

    setLoggedUserDetails(userDetails) {
        debugger;
        this.loggedUser = userDetails;
        this.Username = this.loggedUser.FirstName;
        if (this.loggedUser.SelectedCompany !== null && this.loggedUser.SelectedCompany !== undefined)
            this.selectedCompanyName = this.loggedUser.SelectedCompany.CompanyName;
        else
            this.selectedCompanyName = null;

        sessionStorage.setItem('loggedUserDetails', JSON.stringify(userDetails));
        localStorage.setItem('loggedUserDetails', JSON.stringify(userDetails));
    }

}