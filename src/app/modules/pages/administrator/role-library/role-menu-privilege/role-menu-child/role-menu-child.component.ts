import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';

@Component({
  selector: 'app-role-menu-child',
  templateUrl: './role-menu-child.component.html',
  styleUrls: ['./role-menu-child.component.css']
})
export class RoleMenuChildComponent implements OnInit {
  @Input() items: any[];
  @Output() items1: any[];
  // @Output() items1: NavItem[];
  @ViewChild('childMenu') public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
