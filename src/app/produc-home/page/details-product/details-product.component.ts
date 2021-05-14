import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../product/services/product.service';
import {Observable} from 'rxjs';
import {ProductI} from '../../../product/models/product.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {
  wsp = 'https://api.whatsapp.com/send?phone=51929157461&text= 👋✋👋  ¡Hola! rous 👧, tienes disponible,';
  wspPregunta = 'https://api.whatsapp.com/send?phone=51929157461&text= 👋✋👋  ¡Hola! rous 👧, una consulta';
  off = 15;
  public prod$: Observable<ProductI>;
  constructor(private prodSrv: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.prod$ = this.prodSrv.getOneProduct(idPost);
  }

}
