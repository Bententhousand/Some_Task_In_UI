import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';
import { Area } from '../../../models/administrator/location/area.model';
import { catchError } from 'rxjs/operators';


const API_URL = environment.apiUrl;

@Injectable()
export class AreaService {

    AreaValue: any = []
    isEditing: boolean;
    constructor(private _http: Http, private _httpClient: HttpClient, private _headerStorage: HeaderStorageService) { }
    // setIsEditing(value: boolean) {
    //     this.isEditing = value
    // }
    // getIsEditing() {
    //     return this.isEditing;
    // }

    saveAreaDetail(element): Observable<any> {
        return this._httpClient.post<any>(API_URL + "Area/Create", element)
            .pipe(catchError(this.handleError));
    }

    // saveAreaDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'Area/Create', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    listAreaDetailsByCityId(Id): Observable<any> {
        return this._httpClient.get<any>(API_URL + "Area/GetAreaByCityId/" + Id)
            .pipe(catchError(this.handleError));
    }

    // listAreaDetailsByCityId(Id): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Area/GetAreaByCityId/' + Id;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    removeArea(element): Observable<any> {
        return this._httpClient.delete<any>(API_URL + "Area/Delete/", element.AreaId)
            .pipe(catchError(this.handleError));
    }

    // removeArea(id) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const area = new Area
    //     area.AreaId = id
    //     const dataUrl = API_URL + 'Area/Delete/' + id.AreaId;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    listAreaDetails(): Observable<any> {
        return this._httpClient.get<any>(API_URL + "Area/AllArea")
            .pipe(catchError(this.handleError));
    }

    // listAreaDetails(): Observable<any> {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Area/AllArea';
    //     return this._http.get(dataUrl, { headers: headers })
    // }


    updateAreaDetail(element): Observable<any> {
        return this._httpClient.put<any>(API_URL + "Area/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateAreaDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'Area/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    handleError(error: Response) {
        return Observable.throw(error);
    }

    // setAreaVal(element: any = []) {
    //     debugger
    //     this.AreaValue = element
    // }
    // getAreaVal() {
    //     debugger
    //     return this.AreaValue;
    // }

}
