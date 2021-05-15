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

  public prod$: Observable<ProductI>;

  constructor( private route: ActivatedRoute,
               private servicePro: ProductService) {
  }

  ngOnInit(): void {
    const idProd = this.route.snapshot.params.id;
    this.prod$ = this.servicePro.getOneProduct(idProd);
  }

}
