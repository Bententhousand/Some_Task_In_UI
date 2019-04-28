import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OrganizationLevel } from '../../../../models/administrator/organization/organization.model';
import { OrganizationlevelService } from '../../../../services/administrator/organization/organization-level.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  isEditing = false;
  model: any = {};
  OrganizationlevelArray: any = [];
  OrganizationlevelIdName: any = [];
  ListOrganizationLevelArray: any;
  // dataSource: MatTableDataSource<Element>;
  _router: any;

  constructor(private _OrganizationLevel: OrganizationlevelService) { }

  ngOnInit() {
    this.viewOraganizationLevelDetails();
    this.GetOrganizationLevelName();

  }
  displayedColumns = ['SNo', 'Code', 'LevelName', 'ReportingOffice', 'action'];
  viewFlag = true;

  onNewClick() {
    this.isEditing=false;
    this.viewFlag = !this.viewFlag;
    this.model = {};
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  saveOrganizationLevel() {
    debugger;
    if (this.isEditing == true) {
      const organizationlevel = new OrganizationLevel();
      organizationlevel.LevelName = this.model.LevelName;
      organizationlevel.OrganizationLevelId = this.model.OrganizationLevelId;
      organizationlevel.Code = this.model.Code;
      organizationlevel.Parent = this.model.Parent;
      organizationlevel.ParentName = this.model.ParentName;
      this._OrganizationLevel.updateOrganizationLevel(organizationlevel).subscribe((res: any) => {
        if (res) {
          debugger;
          alert("updated Successfully");
          this.ngOnInit();
          this.viewFlag =!this.viewFlag;
        }
      });
    } 
    if (this.isEditing == false) {
      debugger;
      const organizationlevel = new OrganizationLevel();
      organizationlevel.OrganizationLevelId = this.model.OrganizationLevelId;
      organizationlevel.LevelName = this.model.LevelName;
      organizationlevel.Code = this.model.Code;
      organizationlevel.Parent = this.model.Parent;
      this._OrganizationLevel.saveOrganizationLevel(organizationlevel).subscribe((res: any) => {
        if (res) {
          debugger;
          alert("Saved Successfully");
          this.ngOnInit();
          this.viewFlag =!this.viewFlag;
        }
      });
    }
  }
  GetOrganizationLevelName() {
    this._OrganizationLevel.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      if (data) {
        this.OrganizationlevelIdName = data;
        console.log(this.OrganizationlevelIdName, 'OrganizationlevelIdName');
      }
    }
    )
  }
  viewOraganizationLevelDetails() {
    debugger;
    this._OrganizationLevel.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListOrganizationLevelArray = data;
      this.matTableConfig(this.ListOrganizationLevelArray);
      console.log(this.ListOrganizationLevelArray, "ListOrganizationLevelArray")
    })
  }

  matTableConfig(tableRecords: any): void {
    this.dataSource = new MatTableDataSource(tableRecords);
    this.dataSource.paginator = this.tablePaginator;
    this.dataSource.sort = this.sort;
  }


  editOrg(isEditing, element) {
    debugger;
    this.model = element;
    this.isEditing = isEditing;
    this.viewFlag = !this.viewFlag;

  }

  Removeorg(element) {
    debugger;
    const orglevel = new OrganizationLevel();
    orglevel.OrganizationLevelId = element.OrganizationLevelId;
    this._OrganizationLevel.removeOrg(orglevel).subscribe(response => {
      debugger;
      this.ListOrganizationLevelArray = response['result'];
      alert("Are you sure to Delete")
      this.viewOraganizationLevelDetails();
      this.dataSource = new MatTableDataSource(this.ListOrganizationLevelArray);
      this.dataSource.sort = this.sort;
      console.log(this.ListOrganizationLevelArray);
    });
  }
}



