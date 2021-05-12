import { Component, OnInit } from '@angular/core';
import {ProductI} from '../../models/product.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gatoCompra = 40;
  public prod$: Observable<ProductI>;
  fakeData: ProductI[] = [
    {
      nameProd: 'Mascarilla KN95 plegables, para niñ@s con diseño ',
      imgProd: 'https://firebasestorage.googleapis.com/v0/b/nove-rous.appspot.com/o/products%2FWhatsApp%20Image%202021-04-27%20at%2023.12.46.jpeg?alt=media&token=9c333823-c5fd-4e2d-87e8-29438f36e186',
      descriptionProd: 'Mascarilla plegable kn95 fish en la marca MAYFIELD para niño o niña con diseño 🤗 paquete de 10 unidades 🔥',
      priceProd: 7,
      totalProd: 10,
      soldProd: 9
    }
  ];

  constructor( private route: ActivatedRoute,
               private servicePro: ProductService) {
  }

  ngOnInit(): void {
    const idProd = this.route.snapshot.params.id;
    this.prod$ = this.servicePro.getOneProduct(idProd);
  }

}
