import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { LoginService } from '../../../modules/services/login/login.service';
import { StarterComponent } from '../../../starter/starter.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class AppSidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  menuItems: any = [];
  loggedUser: any;
  selectedCompany: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    // public menuItems: MenuItems,
    private _loginService: LoginService,
    private _starterComponent: StarterComponent
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getMenus(userId) {
    this._loginService.getMenus(userId).subscribe(response => {
      debugger;
      if (response) {
        this.menuItems = response;
        // if (this.menuItems.length > 2) {
        //   var Arr = [];
        //   for (var i = 0; i < this.menuItems.length; i++) {
        //     if (i < 6) {
        //       Arr.push(this.menuItems[i])
        //     }
        //   }
        //   var Others = {
        //     IsSelected: true,
        //     MenuAction: [],
        //     MenuIcon: "",
        //     MenuId: 0,
        //     MenuName: "Others",
        //     MenuOrder: 6,
        //     MenuUrl: "",
        //     ParentId: 0,
        //     SubMenuItems: []
        //   };
        //   for (var i = 0; i < this.menuItems.length; i++) {
        //     if (i > 1) {
        //       Others.SubMenuItems.push(this.menuItems[i])
        //     }
        //   }
        //   Arr.push(Others)
        //   this.menuItems = Arr;
        //   console.log(this.menuItems, "Menus")
        // }
        this.getUserDetail(userId);
      }
    }, error => {
    });
  }

  getUserDetail(userId) {
    this._loginService.getUserDetail(userId).subscribe(response => {
      debugger;
      if (response) {
        var userName = response.Username;
        localStorage.setItem('UserName', userName);
        sessionStorage.setItem('UserName', userName);
        this._loginService.setLoggedUserDetails(response);
        this.loggedUser = this._loginService.getLoggedUserDetails();
        if (this.loggedUser.SelectedCompany) {
          this.selectedCompany = this.loggedUser.SelectedCompany;
        }
      }
    }, error => {
    });
  }


  ngOnInit() {
    var userId = sessionStorage.getItem('UserID');
    this.getMenus(userId);


    // this.menuItems = this._starterComponent.getMenu();
    // console.log(this.menuItems ,"Local Menu");
  }

}
