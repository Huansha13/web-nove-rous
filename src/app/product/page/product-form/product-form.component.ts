import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import { Products } from '../../models/product.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  private image: any;
  public imgSrc: string = 'https://kinsta.com/es/wp-content/uploads/sites/8/2017/07/carga-masiva.png';
  uploadPercent$ = this.producService.uploadPercent$;
  @Input() product: Products;
  constructor(
      private router: Router,
      private producService: ProductService ) { }

  public newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    vendidos: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  addNewPost(date: Products): void {
    console.log(date);
    this.producService.preAdd(date, this.image);
  }

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    } else  {
      this.imgSrc = '';
      this.image = null;
    }
  }


}
