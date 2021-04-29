import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AccountService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private router: Router, private lgService: AccountService ) { }

  // admin(): void {
  //
  // }
  ngOnInit(): void {
  }

  async onLogin(): Promise<void> {
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.lgService.onLogin(email, password);
      if (user) {
        await this.router.navigate(['/admin']);
      }
    } catch (err){
      console.log(err);
    }
  }

}
