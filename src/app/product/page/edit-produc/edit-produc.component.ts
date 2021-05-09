import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Products} from '../../models/product.interface';
import {ProductFormComponent} from '../product-form/product-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: 'edit-produc.component.html',
  styleUrls: ['edit-produc.component.scss']
})
export class EditProducComponent implements OnInit{

  private image: any;
  private imageOriginas: any;

  @Input() product: Products;
  constructor( private productService: ProductService,
               private roter: Router) {
  }

  public editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    vendidos: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.image = this.product.img;
    this.imageOriginas = this.product.img;
    this.initValuesForm();
  }
  editProduct(prod: Products): void {
    if (this.image === this.imageOriginas) {
      prod.img = this.imageOriginas;
      this.productService.editPostById(prod);
    } else {
      this.productService.editPostById(prod, this.image);
    }
  }
  showPreview(event: any): void {
  }
  private initValuesForm(): void {
    this.editProductForm.patchValue( {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      total: this.product.total,
      vendidos: this.product.vendidos
    });
  }
}
