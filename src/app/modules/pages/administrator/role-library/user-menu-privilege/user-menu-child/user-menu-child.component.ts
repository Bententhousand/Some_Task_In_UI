import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-menu-child',
  templateUrl: './user-menu-child.component.html',
  styleUrls: ['./user-menu-child.component.css']
})
export class UserMenuChildComponent implements OnInit {
  // @Input() items: NavItem[];
  @Input() items: any[];
  @ViewChild('childMenu') public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
