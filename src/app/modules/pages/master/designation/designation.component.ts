import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DepartmentService } from '../../../services/master/department.service';
import { LocalStorage } from '../../../../shared/local-storage';
import { DesignationService } from '../../../services/master/designation.service';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  isEditing = false;
  viewFlag = true;
  designationData: any = [];
  departmentData: any = [];
  designation: any = {};
  parentDesignationData: any = [];

  userCompanyId: any;
  DesignDetails: any;
  ELEMENT_DATA: Element[] = [];
  //for table
  displayedColumns = ['SNo', 'Code', 'DesignationName', 'Superior', 'DepartmentId', 'CompanyId', 'action'];

  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  companyId: any;
  companyData: any[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor(
    private _departmentService: DepartmentService,
    private _headerService: LocalStorage, private _designationservice: DesignationService,
  ) { }

  ngOnInit() {
    this.getDesignationDetails();
    this.getDesignation();
    this.getCompany();
    this.getDepartment();
  }

  addDesignation() {
    debugger;
    let element = {
      DesignationId: this.designation.DesignationId,
      DesignationName: this.designation.DesignationName,
      Code: this.designation.Code,
      CompanyId: this.designation.CompanyId,
      DepartmentId: this.designation.DepartmentId,
      Superior: this.designation.Superior,
      IsActive: true,
      CreatedBy: localStorage.getItem('userID'),
      ModifiedBy: localStorage.getItem('userID'),
    }
    if (this.isEditing == true) {
      this._designationservice.updateDesignationDetail(element).subscribe((response: any) => {
        if (response.IsSuccess) {
          alert("Updated");
          this.onListClick();
          this.designation = {};
        }
      });
    } else {
      this._designationservice.saveDesignationDetail(element).subscribe((response: any) => {
        if (response.IsSuccess) {
          this.onListClick();
          this.designation = {};
        }
      });
    }
  }

  getDesignationDetails() {
    debugger;
    this.userCompanyId = 1;
    this._designationservice.listDesignationDetails(this.userCompanyId).subscribe((result: any) => {
      debugger;
      if (result)
        this.ELEMENT_DATA = result;
      this.setMatTable();
    })
  }

  setMatTable() {
    this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  removeDesignation(element) {
    debugger;
    this._designationservice.deleteDepartmentDetail(element.DesignationId).subscribe((result: any) => {
      debugger;
      const data = result;
      this.getDesignationDetails();
    })
  }

  getDesignation() {
    this.userCompanyId = 1;
    // this.userCompanyId = this._headerService.getCompanyId();
    this._designationservice.listDesignationDetails(this.userCompanyId).subscribe((result: any) => {
      debugger;
      if (result)
        this.parentDesignationData = result;
        console.log(this.parentDesignationData,"Parent")
    })
  }

  getCompany() {
    debugger;
    this._departmentService.listCompanyInitiation().subscribe((result: any) => {
      if (result) {
        debugger;
        this.companyData = result;
      }
    })
  }

  getDepartment() {
    debugger;
    this.userCompanyId = 1
    this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((result: any) => {
      if (result)
        this.departmentData = result;
    })
  }

  onNewClick(): void {
    this.designation = {};
    this.viewFlag = !this.viewFlag;
    this.isEditing = false;
  }

  onListClick(): void {
    this.getDesignationDetails();
    this.isEditing = false;
    this.viewFlag = !this.viewFlag;
  }

  editDesignation(element) {
    debugger;
    this.isEditing = true;
    this.companyData = [element.Company];
    this.departmentData = [element.Department];
    this.parentDesignationData = [{ DesignationId: element.Superior, DesignationName: element.SuperiorName }];
    this.getCompany();
    this.getDesignation();
    this.designation = element;
    this.viewFlag = !this.viewFlag;
  }
}

export interface Element {
  SNo: number;
  DesignationName: string
  CompanyId: number
  DepartmentId: number
  Superior: number
  Code: string
}


