import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../product/services/product.service';
import {Observable} from 'rxjs';
import {ProductI} from '../product/models/product.interface';
import {AccountService} from '../acount/service/account.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = new Date();
  wsp = 'https://api.whatsapp.com/send?phone=51929157461&text= 👋✋👋  ¡Hola! rous 👧, tienes disponible,';
  off = 15;
  dataFake: any = [
    {
      img: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/876/461/products/8565551-ed5bde0cf931f891c715809271211974-640-0.png',
      name: 'Mini Mochila'
    },
    {
      img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/f2e25ec82afc48cb8f5fac7c01405382_9366/Tenis_ZX_10000_Krusty_Burger_Blanco_H05783.jpg',
      name: 'Tenis ZX 10000 Krusty Burger'
    },
    {
      img: 'https://kaelimportaciones.com/wp-content/uploads/2020/09/lonchera-termica-rayas.jpg',
      name: 'Lonchera Termica'
    }
  ];
  dtaPre: any = [
    {
      icon: '<i class="uil uil-rocket"></i>',
      title: 'Envío gratis',
      subTitle: 'para todos tus pedidos'
    },
    {
      icon: '<i class="uil uil-wallet"></i>',
      title: 'Ahorra dinero',
      subTitle: 'con los mejores precios'
    },
    {
      icon: '<i class="uil uil-box"></i>',
      title: 'Productos',
      subTitle: 'con 100% de calidad'
    },
    {
      icon: '<i class="uil uil-whatsapp"></i>',
      title: 'Atención los 24/7',
      subTitle: '(+51) 929 157 461'
    }
  ];
  public products$: Observable<ProductI[]>;
  // @Input() prod: ProductI;
  constructor( private router: Router,
               private prodService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.prodService.getAllProduct();
  }

}
