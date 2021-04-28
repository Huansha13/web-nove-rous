import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../product/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = new Date();
  wsp = 'https://api.whatsapp.com/send?phone=51929157461&text= 👋✋👋  ¡Hola! rous 👧, tienes disponible,';

  products$ = this.prodService.products;

  constructor( private router: Router, private prodService: ProductService) { }

  login(): void {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }

}
