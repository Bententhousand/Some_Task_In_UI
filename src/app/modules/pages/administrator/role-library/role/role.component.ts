// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-role',
//   templateUrl: './role.component.html',
//   styleUrls: ['./role.component.css']
// })
// export class RoleComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/administrator/role-library/role.model';
import { RoleService } from '../../../../services/administrator/role-library/role.service';
import { OrganizationlevelService } from '../../../../services/administrator/organization/organization-level.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  displayedColumns = ['SNo', 'RoleName', 'OrganizationLevel', 'action'];
  Rolemodel: any =[];
  organizationlevelIdName: any =[];
  ListRole: any =[];
  dataSource: MatTableDataSource<Element>;
  paginator: any;
  sort: any;

  constructor(private _RoleService: RoleService, private _organizationlevel: OrganizationlevelService) { }


  onNewClick(){
   this.viewFlag=!this.viewFlag;
   this.isEditing=false;
   this.Rolemodel ={};
  }
  ngOnInit() {
    this.viewRoleDetails();
    this.GetorganizationlevelName();
  }
  isEditing = false;
  viewFlag=true;

  SaveRole() {
    if (this.isEditing == false) {
      const role = new Role();
      role.RoleName = this.Rolemodel.RoleName;
      role.OrganizationLevelId = this.Rolemodel.OrganizationLevelId;
      this._RoleService.saveRoleDetail(role).subscribe((res: any) => {
        if (res) {

          alert("Successfully saved")
          this.ngOnInit();
          this.viewFlag=!this.viewFlag;

        }
      });
      console.log(role);
    }
    if (this.isEditing == true) {
      debugger;
      const role = new Role();
      role.RoleName = this.Rolemodel.RoleName;
      role.OrganizationLevelId = this.Rolemodel.OrganizationLevelId;
      role.RoleId = this.Rolemodel.RoleId;
      this._RoleService.modifyRoleDetail(role).subscribe((res: any) => {
        if (res) {

          alert("Successfully Updated")
          this.ngOnInit();
          this.viewFlag =!this.viewFlag;
        }
      });
    }
  }

  GetorganizationlevelName() {
    debugger;
    this._organizationlevel.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.organizationlevelIdName = JSON.parse(data._body);
        console.log(this.organizationlevelIdName, 'organizationlevelName')
      }
    }
    )
  }

  viewRoleDetails() {
    debugger;
    this._RoleService.listRoleDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListRole = JSON.parse(data._body);
        for (var i in this.ListRole) {
          this.ListRole[i].level_Name = this.ListRole[i].OrganizationLevel.LevelName
        }
      this.dataSource = new MatTableDataSource<Element>(this.ListRole);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ListRole, "ListRole")

    })
  }

  removeRole(element) {
    debugger;
    const role = new Role();
    role.RoleId = element.RoleId;
    this._RoleService.deleteRoleDetail(role.RoleId).subscribe((data: any) => {
      debugger;
      this.ListRole = data['result'];
      this.viewRoleDetails();
      alert("Are you sure to Delete")
      this.dataSource = new MatTableDataSource(this.ListRole);
      this.dataSource.sort = this.sort;

    })
  }

  editRoles(isEditing, modifyelement){
    debugger;
  this.Rolemodel = modifyelement;
  this.isEditing = isEditing;
  this.viewFlag  = !this.viewFlag;
  }

}