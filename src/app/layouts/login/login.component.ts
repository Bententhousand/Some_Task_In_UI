import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../modules/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  isCheck: boolean = false;
  processString: string = "Sign In";

  constructor(private _router: Router, private _loginService: LoginService, ) { }

  ngOnInit() {
  }

  login() {
    debugger;
    this.isCheck = true;
    this.processString = "Processing";
    this._loginService.login(this.user).subscribe(response => {
      debugger;
      if (response.status == 200) {
        this.isCheck = false;
        this.processString = "Sign In";
        this._router.navigate([`./starter`]);
      }
    }, error => {
      this.isCheck = false;
      this.processString = "Sign In";
      // this.toastr.error("invalid username  and password");
    });
  }
}
