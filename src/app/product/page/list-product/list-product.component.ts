import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Products} from '../../models/product.interface';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products$ = this.prodService.getAllProduct();

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(private router: Router, private prodService: ProductService) { }



  ngOnInit(): void {
    // this.prodService.getAllProduct().subscribe(prod => (this.products$.))
  }

  onGoToEdit(prod: Products): void {
    this.navigationExtras.state.value = prod;
    this.router.navigate(['/admin/edit'], this.navigationExtras);
  }

  onGoToDelete(product: Products): void{
    console.log(product);
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.prodService.onDeleteProduts(product).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was an error deleting this product',
            'error'
          );
        });
      }
    });
  }

}
