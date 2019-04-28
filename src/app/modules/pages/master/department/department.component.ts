import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DepartmentService } from '../../../services/master/department.service';
import { LocalStorage } from '../../../../shared/local-storage';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  isEditing = false;
  viewFlag = true;
  department: any = {};
  DepartmentDetails: any = [];
  parentDepartmentData: any = [];
  userCompanyId: number;
  companyData: any = [];

  //for table
  departmentData: any = []
  displayedColumns = ['SNo', 'DepartmentCode', 'DepartmentName', 'ParentDepartment', 'CompanyId', 'action'];

  dataSource = new MatTableDataSource<Element>(this.departmentData);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
    private _localStorage: LocalStorage
  ) { }

  ngOnInit() {
    this.getDepartmentDetails();
    this.getCompany();
  }

  addDepartment() {
    debugger;
    let element = {
      DepartmentId: this.department.DepartmentId == undefined || this.department.DepartmentId == "" ? this.department.DepartmentId = 0 : this.department.DepartmentId,
      Code: this.department.Code,
      CompanyId: this.department.CompanyId,
      ParentId: this.department.ParentId,
      DepartmentName: this.department.DepartmentName,
      IsActive: true,
      CreatedBy: localStorage.getItem('userID'),
      ModifiedBy: localStorage.getItem('userID'),
    }
    if (this.isEditing == true) {
      debugger;
      this._departmentService.updateDepartmentDetail(element).subscribe((response: any) => {
        if (response.IsSuccess) {
          debugger;
          alert("updated");
          this.onListClick();
          this.department = {};
        }
      });
    } else {
      debugger
      // let element = {
      //   //  DepartmentId: this.department.DepartmentId,
      //   DepartmentCode: this.department.DepartmentCode,
      //   CompanyId: this.department.CompanyId,
      //   ParentId: this.department.ParentId,
      //   DepartmentName: this.department.DepartmentName,
      //   // IsActive: true,
      // }
      this._departmentService.saveDepartmentDetail(element).subscribe((response: any) => {
        if (response.IsSuccess) {
          alert("Saved");
          this.onListClick();
          this.department = {};
        }
      });
    }
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

  getDepartmentDetails() {
    debugger;
    this.userCompanyId = 1;
    // this.userCompanyId = this._localStorage.getCompanyId();
    this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((result: any) => {
      debugger;
      if (result) {
        this.departmentData = result;
        // this.parentDepartmentData = result;
        this.setMatTable();
      }
    })
  }

  setMatTable() {
    this.dataSource = new MatTableDataSource<Element>(this.departmentData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getParentDepartment() {
    debugger;
    let element = {
      CompanyId: 1,
      UserCompanyId: 1
    }
    this._departmentService.listParentDepartmentDetails(element).subscribe((result: any) => {
      debugger;
      if (result) {
        this.parentDepartmentData = result;
      }
    })
  }

  removeDepartment(value) {
    debugger;
    // let element = {
    //   DepartmentId: value.DepartmentId
    // }
    this._departmentService.deleteDepartmentDetail(value.DepartmentId).subscribe((result: any) => {
      debugger;
      const detail = result;
      this.getDepartmentDetails();
    })
  }

  editDepartment(element) {
    debugger;
    this.isEditing = true;
    this.companyData = [element.Company];
    this.parentDepartmentData = [{ DepartmentId: element.DepartmentId, DepartmentName: element.DepartmentName }];
    this.getCompany();
    this.getParentDepartment();
    this.department = element;
    this.viewFlag = !this.viewFlag;
  }

  onNewClick(): void {
    this.department = {};
    this.viewFlag = !this.viewFlag;
    this.isEditing = false;
  }

  onListClick(): void {
    this.getDepartmentDetails();
    this.isEditing = false;
    this.viewFlag = !this.viewFlag;
  }

}

export interface Element {
  SNo: number;
  DepartmentCode: string;
  DepartmentName: string;
  ParentDepartment: string;
  CompanyId: string;
} 