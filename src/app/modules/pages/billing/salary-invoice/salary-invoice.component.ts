import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-invoice',
  templateUrl: './salary-invoice.component.html',
  styleUrls: ['./salary-invoice.component.css']
})
export class SalaryInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  SalaryView = false;
  AnnexureView = false;
  onListSalaryClick() {
    this.SalaryView = !this.SalaryView;
  }
  onListAnnexureClick() {
    this.AnnexureView = !this.AnnexureView;
  }
}
