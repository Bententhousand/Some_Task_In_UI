import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../services/administrator/role-library/role.service';

@Component({
  selector: 'app-role-menu-privilege',
  templateUrl: './role-menu-privilege.component.html',
  styleUrls: ['./role-menu-privilege.component.css']
})
export class RoleMenuPrivilegeComponent implements OnInit {
  RoleName: any = []
  model = {}
  UserId: any;
  // navItems: NavItem[] = [];
  // items: NavItem[];
  navItems: any[] = [];
  items: any[];
  constructor(private _RoleService: RoleService,
    // private _NavbarMenuService: NavBarMenuService, 
    private _router: Router,
    // private _headerStorage: HeaderStorage, 
  ) { }

  GetRoleName() {
    this._RoleService.listRoleDetails().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.RoleName = JSON.parse(data._body);
        console.log(this.RoleName, 'RoleName')
      }
    }
    )
  }
  save() {
    debugger;
    this.navItems
  }
  ngOnInit() {
    this.GetRoleName();
    // this.getRole();
  }
  // getRole() {
  //   this.UserId = this._headerStorage.getUserId();
  //   if (this.UserId) {
  //     this._NavbarMenuService.getMenuesForNavbarbyUserid(this.UserId).subscribe((response: any) => {
  //       debugger;
  //       this.navItems = JSON.parse(response._body);
  //     })

  //   } else {
  //     alert("user is not set")
  //     this._router.navigate[('/login')];
  //   }

  // }
}
