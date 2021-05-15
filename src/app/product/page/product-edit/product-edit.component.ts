import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductI} from '../../models/product.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private image: any;
  private imageOriginal: any;
  imgPreview = 'https://res.cloudinary.com/yfr/image/upload/v1620793519/portafolio/imgUpload_jmhq44.svg';
  @Input() prod: ProductI;
  constructor( private postSv: ProductService,
               private dialog: MatDialog) {}

  public editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nameProd: new FormControl('', Validators.required),
    imgProd: new FormControl(''),
    descriptionProd: new FormControl('', Validators.required),
    totalProd: new FormControl('', Validators.required),
    priceProd: new FormControl('', Validators.required),
    soldProd: new FormControl('', Validators.required),
    cantidadProd: new FormControl('', Validators.required),
    gastoCompra: new FormControl('', Validators.required),
    off: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.image = this.prod.imgProd;
    this.imageOriginal = this.prod.imgProd;
    this.initValuesForm();
    this.imgPreview = this.prod.imgProd;
  }
  alertErr(): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Llena los campos!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  alertOk(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se actualizo!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  editProduct( prod: ProductI): any {
    if (this.editProductForm.valid) {
      if (this.image === this.imageOriginal) {
        prod.imgProd = this.imageOriginal;
        this.postSv.editPostById(prod);
        this.alertOk();
        this.dialog.closeAll();
      } else {
        this.postSv.editPostById(prod, this.image);
        this.alertOk();
        this.dialog.closeAll();
      }
    } else {
      this.alertErr();
    }


  }

  handleImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgPreview = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    } else {
      this.imgPreview = this.prod.imgProd;
    }
  }


  private initValuesForm(): void {
    this.editProductForm.patchValue({
      id: this.prod.id,
      nameProd: this.prod.nameProd,
      // imgProd: this.prod.imgProd,
      descriptionProd: this.prod.descriptionProd,
      totalProd: this.prod.totalProd,
      priceProd: this.prod.priceProd,
      soldProd: this.prod.soldProd,
      cantidadProd: this.prod.cantidadProd,
      gastoCompra: this.prod.gastoCompra,
      off: this.prod.off
    });
  }
}
