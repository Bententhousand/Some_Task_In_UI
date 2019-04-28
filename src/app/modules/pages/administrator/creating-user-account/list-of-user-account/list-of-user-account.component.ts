import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccountService } from '../../../../services/administrator/user-acccount/user-account.service';
import { UserAccount } from '../../../../models/administrator/user-account/user-account.model';


@Component({
  selector: 'app-list-of-user-account',
  templateUrl: './list-of-user-account.component.html',
  styleUrls: ['./list-of-user-account.component.css']
})
export class ListOfUserAccountComponent implements OnInit {
  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';

  //for table
  displayedColumns = ['SNo', 'Name', 'Email', 'Role', 'action'];

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
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

  ListUser: any = []
  constructor(private http: HttpClient, private _listUserAccountservice: UserAccountService,
    private _router: Router) { }
  viewUserDetails() {
    debugger;
    this._listUserAccountservice.listUserAccountDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListUser = JSON.parse(data._body);
      this.dataSource = new MatTableDataSource<Element>(this.ListUser);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._listUserAccountservice.setUserVal(this.ListUser)
      console.log(this.ListUser, "ListUser")

    })
  }
  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewUserDetails();
  }

  removeUser(element) {
    debugger;
    const user = new UserAccount();
    user.UserId = element.UserId
    this._listUserAccountservice.deleteUserDetail(user.UserId).subscribe((data: any) => {
      debugger;
      this.ListUser = data['result'];
      this.viewUserDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.ListUser);
      this.dataSource.sort = this.sort;

    })
  }
  editUserDetails(value, element) {
    debugger;

    this._listUserAccountservice.setUserVal(element);
    this._listUserAccountservice.setIsEditing(value)
    this._router.navigate(["AddUserAccount"])
  }

  AddUserdetails(value) {
    debugger;
    this._listUserAccountservice.setIsEditing(value);
    this._router.navigate(["AddUserAccount"])
  }
}


//for table
export interface Element {
  SNo: number;
  Name: string;
  Role: string;
  Email: string;

}
const ELEMENT_DATA: Element[] = [
  { SNo: 2532, Name: 'SWD', Role: 'Software Developer', Email: 'ManagingDirector' },
  { SNo: 2532, Name: 'SWD', Role: 'Software Developer', Email: 'ManagingDirector' },
];

