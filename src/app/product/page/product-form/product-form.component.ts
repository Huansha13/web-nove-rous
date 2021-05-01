import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
// @ts-ignore
import { Products } from '../../models/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Products;
  productForm: FormGroup;
  constructor(private router: Router, private  fb: FormBuilder, private producService: ProductService ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.product === 'undefined') {
      this.router.navigate(['admin/add']);
    }else {
      this.productForm.patchValue(this.product);
    }
  }

  onSave(): void {
    // console.log('Saved', this.productForm.value);
    if (this.productForm.valid) {
      const product = this.productForm.value;
      const productId = this.product?.id || null;
      this.producService.onSaveProducts(product, productId);
      this.productForm.reset();
      this.router.navigate(['/admin/list']);
    }
  }
  isValidField(field: string): string {
    const validatedFiled = this.productForm.get(field);
    return (!validatedFiled.valid && validatedFiled.touched)
    ? 'is-invalid' : validatedFiled.touched ? 'is-valid' : '';
  }
  private initForm(): void {
    this.productForm =  this.fb.group({
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      total: ['', [Validators.required]],
      vendidos: ['', [Validators.required]]
    });
  }
}
