import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../acount/service/account.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [AccountService]
})
export class NavComponent implements OnInit {

  public isLogged = false;
  public usr = null;

  constructor(private router: Router, private lgService: AccountService) { }

  async ngOnInit(): Promise<void> {
    this.usr = await this.lgService.getCurrentUser();
    if (this.usr) {
      this.isLogged = true;
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this.lgService.logout();
      await this.router.navigate(['/login']);
    } catch (err) {
      console.log(err);
    }
  }
}
