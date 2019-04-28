import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-child-menu',
  templateUrl: './child-menu.component.html',
  styleUrls: ['./child-menu.component.css']
})
export class ChildMenuComponent implements OnInit {

  
  @Input() items: any[];


  @ViewChild('SubMenuItems') public SubMenuItems;
  constructor() { }

  ngOnInit() {
  }

}
