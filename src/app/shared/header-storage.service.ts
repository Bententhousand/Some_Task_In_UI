import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HeaderStorageService {
  UserId: any;
  token: any;
  CompanyId: number;
  CompanyName: string;
  RoleId: number;
  RoleName: string;
  month: any;
  year: any;
  position: any;

  constructor() {}

  setMonth(value: any) {
    this.month = value;
  }

  getMonth() {
    return this.month;
  }

  setPosition(value) {
    this.position = value;
  }

  getPosition() {
    return this.position;
  }

  setYear(value: any) {
    this.year = value;
  }

  getYear() {
    return this.year;
  }

  setUserId(value: any) {
    this.UserId = value;
  }
  StereoPannerOptions;
  getUserId() {
    return this.UserId;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    debugger;
    return this.token;
  }
  //Company
  setCompanyId(value: number) {
    this.CompanyId = value;
  }

  getCompanyId() {
    debugger;
    return this.CompanyId;
  }

  setCompanyName(value: string) {
    this.CompanyName = value;
  }

  getCompanyName() {
    debugger;
    return this.CompanyName;
  }
  //Role
  setRoleId(value: number) {
    this.RoleId = value;
  }

  getRoleId() {
    debugger;
    return this.RoleId;
  }

  setRoleName(value: string) {
    this.RoleName = value;
  }

  getRoleName() {
    debugger;
    return this.RoleName;
  }
}
