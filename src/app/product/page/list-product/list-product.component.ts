import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products$ = this.prodService.products;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(private router: Router, private prodService: ProductService) { }



  ngOnInit(): void {
  }

  onGoToEdit(prod: any): void {
    this.navigationExtras.state.value = prod;
    this.router.navigate(['/admin/edit'], this.navigationExtras);
  }

  async onGoToDelete(prodId: string): Promise<void> {
    try {
      await this.prodService.onDeleteProduts(prodId);
    } catch (err) {
      console.log(err);
    }
  }

}
