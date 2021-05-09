import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Products} from '../../models/product.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {ProductFormComponent} from '../product-form/product-form.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productsV = null;
  editProductForm: FormGroup;
  private image: any;
  private imageOriginas: any;
  public imgSrc: string = 'https://kinsta.com/es/wp-content/uploads/sites/8/2017/07/carga-masiva.png';

  @Input() product: Products;
constructor( private roter: Router,
             private productService: ProductService,
             private fb: FormBuilder) {
    const navigation = this.roter.getCurrentNavigation();
    this.productsV = navigation?.extras?.state?.value;
    this.initForm();
}


  private initForm(): void {
    this.editProductForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      total: ['', [Validators.required]],
      vendidos: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.image = this.product.img;
    this.imageOriginas = this.product.img;
    this.editProductForm.patchValue(this.productsV);
  }

  editProduct(prod: Products): void {
    if (this.image === this.imageOriginas) {
      prod.img = this.imageOriginas;
      this.productService.editPostById(prod);
    } else {
      this.productService.editPostById(prod, this.image);
    }
  }
  showPreviewEdit(event: any): void {
    // if (event.target.files && event.target.files[0]) {
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => this.imgSrc = e.target.result;
    //   reader.readAsDataURL(event.target.files[0]);
    //
    // } else  {
    //   this.imgSrc = '';
    //   this.image = null;
    // }
    this.image = event.target.files[0];
  }
  private initValuesForm(prod: Products): void {
    this.imgSrc = prod.img;
    this.editProductForm.patchValue( {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      total: prod.total,
      vendidos: prod.vendidos
    });
  }
}
