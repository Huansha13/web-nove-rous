import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductI} from '../../models/product.interface';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  private image: any;
  imgPreview = 'https://res.cloudinary.com/yfr/image/upload/v1620793519/portafolio/imgUpload_jmhq44.svg';

  constructor( private prodSrv: ProductService,
               private dialog: MatDialog) { }

  public newProdForm = new FormGroup({
    id: new FormControl(''),
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


  ngOnInit(): void { }
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
      title: 'Se guardo!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  addNewProd(data: ProductI): any {
    if (typeof this.image === 'undefined') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Falta foto',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (this.newProdForm.valid) {
        this.prodSrv.preAdd(data, this.image);
        this.dialog.closeAll();
      } else {
        this.alertErr();
      }
    }
  }
  handleImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgPreview = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    } else {
      this.imgPreview = 'https://res.cloudinary.com/yfr/image/upload/v1620793519/portafolio/imgUpload_jmhq44.svg';
    }
  }
}
