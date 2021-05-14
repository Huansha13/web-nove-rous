import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../product/services/product.service';
import {Observable} from 'rxjs';
import {ProductI} from '../../product/models/product.interface';
import {AccountService} from '../../acount/service/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor( public account: AccountService,
               private router: Router) { }

  ngOnInit(): void {
  }
  login(): void {
    this.router.navigate(['/login']);
  }
}
