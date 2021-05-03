import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
// @ts-ignore
import { Products } from '../../models/product.interface';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  imgSrc: string = 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg';
  test: string = 'Hola mundo img';
  selectedImg: any = null;
  product: Products;
  urlImg: Observable<any>;
  uploadPercent: Observable<number>;
  productForm: FormGroup;
  constructor(
      private router: Router, private  fb: FormBuilder,
      private producService: ProductService,
      private storage: AngularFireStorage ) {

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
      vendidos: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
  }
  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg';
      this.selectedImg = null;
    }
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `images/${id.split('.').slice(0, -1).join('.')} ${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.urlImg = fileRef.getDownloadURL();
        })
      ).subscribe();
  }


}
