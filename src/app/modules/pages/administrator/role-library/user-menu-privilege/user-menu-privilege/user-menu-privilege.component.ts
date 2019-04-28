import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../services/administrator/role-library/role.service';

@Component({
  selector: 'app-user-menu-privilege',
  templateUrl: './user-menu-privilege.component.html',
  styleUrls: ['./user-menu-privilege.component.css']
})
export class UserMenuPrivilegeComponent implements OnInit {
  RoleIdName: any = []
  UserMenuList: any = [];
  UserId: any;
  navItems: any[] = [];
  // navItems: NavItem[] = [];
  constructor(private _RoleService: RoleService,
    // private _NavbarMenuService: NavBarMenuService,
    private _router: Router,
    // private _headerStorage: HeaderStorageService,
  ) { }
  GetRoleName() {
    this._RoleService.listRoleDetails().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.RoleIdName = data;
        console.log(this.RoleIdName, 'RoleName')
      }
    }
    )
  }
  ngOnInit() {
    // this.getUsermenu();
  }
  // getUsermenu() {
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
