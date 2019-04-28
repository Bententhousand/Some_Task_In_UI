import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CompanyInitiationService } from '../../../../../services/administrator/organization/company-intiation.service';


@Component({
  selector: 'app-list-of-company',
  templateUrl: './list-of-company.component.html',
  styleUrls: ['./list-of-company.component.css']
})
export class ListOfCompanyComponent implements OnInit {

  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';

  //for table
  displayedColumns = ['SNo', 'CompanyCode', 'CompanyName', 'LevelName', 'ReportingTo',
    'CityName', 'action'];

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

  constructor(private _CompanyService: CompanyInitiationService, private _router: Router) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewCompanyDetails();
  }
  AddCompanydetails(value) {
    // this._CompanyService.setIsEditing(value);
    this._router.navigate(['CreateCompany']);
  }
  ListCompanyArray: any = []
  viewCompanyDetails() {
    debugger;
    this._CompanyService.listCompanyInitiation().subscribe((data: any) => {
      if (data)
        this.ListCompanyArray = JSON.parse(data._body);
      this.dataSource = new MatTableDataSource<Element>(this.ListCompanyArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ListCompanyArray, "ListCompanyArray")
    })
  }
  CompanyArray: any = []
  // RemoveCompany(element){
  //   debugger;
  //   const Company         = new CompanyInitiation();
  //   Company.CompanyId = element.CompanyId;
  //   this._CompanyService.RemoveCompanyInitiation(Company).subscribe(data => {
  //     debugger;
  //     if(data){
  //       this.CompanyArray =data ['result']
  //       alert("success");
  //       this.viewCompantDetails();
  //       this.dataSource      = new MatTableDataSource(this.CompanyArray);
  //       this.dataSource.sort = this.sort;
  //     }



  //   });
  // }

  editCompany(value, element) {
    debugger;
    // this.coVal = element.CountryId;
    // this._CompanyService.setcompVal(element);
    // this._CompanyService.setIsEditing(value);
    this._router.navigate(["CreateCompany"])
  }

  //for Deleteing a Row
  deleteRow(e) {
    let index: number = this.dataSource.data.findIndex(x => x.SNo === e);
    this.dataSource.data.splice(index, 1);
    console.log(this.dataSource);
    console.log(e);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

}


//for table
export interface Element {
  SNo: number;
  CompanyCode: string;
  CompanyName: string;
  LevelName: string;
  ReportingTo: string;
  CityName: string;





}
const ELEMENT_DATA: Element[] = [
  // {SNo: 2532, Code: 'SWD',NameOfCompany: 'Software Developer', 
  // TypeOfOrganization:'ManagingDirector', ReportingTo:'Manager',Location:'Valley Vista Hotel'},
  // {SNo: 1452, Code: 'SE',DesignationName: 'Site Engg',ReportingTo:'Senior Site Engg',NameOfDepartment :'Civil Work',NameOfCompany:'Valley Vista Hotel'},
  // {SNo: 3254, Code: 'SSE',  DesignationName: 'Senior Site Engg',ReportingTo:'Construction Manager',NameOfDepartment:'CivilWork',NameOfCompany:'Valley Vista Hotel'},
  // {position: 9856, Code:de: 'John Doe', Name of the Company: 'Ryder@gmail.com', phoneno: 9666352410},
  // {position: 7452, Code: 'Declan', PinCode: 'John Doe', Name of the Company: 'Declan@gmail.com', phoneno: 6584582130},
  // {position: 6584, Code: 'Elsie', PinCode: 'John Doe', Name of the Company: 'Elsie@gmail.com', phoneno: 6352410002},
  // {position: 8563, Code: 'Finn', PinCode: 'John Doe', Name of the Company: 'Finn@gmail.com', phoneno: 698523333},
  // {position: 1264, Code: 'Beatrice', PinCode: 'Software Developer', Name of the Company: 'Beatrice@gmail.com', phoneno: 9874566621},
  // {position: 4563, Code: 'John Doe', PinCode: 'John Doe', Name of the Company: 'Johndoe@gmail.com', phoneno: 6593222142},
  // {position: 1052, Code: 'Neon', PinCode: 'John Doe', Name of the Company: 'Neone@gmail.com', phoneno: 6542395122},
  // {position: 4511, Code: 'Ryder', PinCode: 'John Doe', Name of the Company: 'Rydere@gmail.com', phoneno: 89652310147},
  // {position: 1582, Code: 'Finn bal', PinCode: 'John Doe', Name of the Company: 'Finnbal@gmail.com', phoneno: 7896524130},
  // {position: 2513, Code: 'John mech', PinCode: 'John Doe', Name of the Company: 'JJohnmech@gmail.com', phoneno: 7896525256},
  // {position: 1498, Code: 'Sham', PinCode: 'John Doe', Name of the Company: 'Sham@gmail.com', phoneno: 6859332512},
  // {position: 1755, Code: 'Angel', PinCode: 'John Doe', Name of the Company: 'Angel@gmail.com', phoneno: 6985566320},
  // {position: 2356, Code: 'Kumar', PinCode: 'John Doe', Name of the Company: 'Kumar@gmail.com', phoneno: 9874563652},
  // {position: 6587, Code: 'Ravi', PinCode: 'John Doe', Name of the Company: 'Ravi@gmail.com', phoneno: 5698542365},
  // {position: 9818, Code: 'Goku', PinCode: 'John Doe', Name of the Company: 'Goku@gmail.com', phoneno: 9586326985},
  // {position: 7619, Code: 'Jiren', PinCode: 'System Analysis', Name of the Company: 'Jiren@gmail.com', phoneno: 8965987456},
  // {position: 8520, Code: 'king', PinCode: 'John Doe', Name of the Company: 'kinggmail.com', phoneno: 9586286352}
];

