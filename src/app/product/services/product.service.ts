import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, map} from 'rxjs/operators';
// @ts-ignore
import {ProductI} from '../models/product.interface';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileI} from '../models/file.interface';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<ProductI>;
  public producData$: Observable<ProductI[]>;
  private filePath: any;
  private downloadURL: Observable<string>;
  uploadPercent$: Observable<number>;

  constructor( private afs: AngularFirestore,
               private storage: AngularFireStorage,
               private router: Router,
               private dialog: MatDialog) {
    this.productsCollection = afs.collection<ProductI>('prod');
  }

  alertOk(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se guardo con exito',
      showConfirmButton: false,
      timer: 1500
    });
  }
  alertErr(): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error al guardar información',
      showConfirmButton: false,
      timer: 1500
    });
  }
  public getAllProduct(): Observable<ProductI[]> {
    return this.productsCollection
      .snapshotChanges()
      .pipe(
        map(action => action.map(a => {
          const data = a.payload.doc.data() as ProductI;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  public getOneProduct(id: ProductI): Observable<ProductI> {
    return this.afs.doc<ProductI>(`prod/${id}`).valueChanges();
  }

  public onDeleteProduct(prod: ProductI): Promise<void> {
    return this.productsCollection.doc(prod.id).delete();
  }

  public editPostById(product: ProductI, newImage?: FileI): Promise<void> {
    if (newImage) {
      this.uploadImg(product, newImage);
    } else {
      return this.productsCollection.doc(product.id).update(product);
    }
  }

  public preAdd(prod: ProductI, image: FileI): void {
    this.uploadImg(prod, image);
    this.alertOk();
  }

  // tslint:disable-next-line:typedef
  private saveProduct(prod: ProductI) {
    const prodObj = {
      nameProd: prod.nameProd,
      descriptionProd: prod.descriptionProd,
      imgProd: this.downloadURL,
      fileRef: this.filePath,
      priceProd: prod.priceProd,
      totalProd: prod.totalProd,
      soldProd: prod.soldProd,
      cantidadProd: prod.cantidadProd,
      gastoCompra: prod.gastoCompra,
      off: prod.off
    };
    if (prod.id) {
      return this.productsCollection.doc(prod.id).update(prodObj);
    } else  {
      this.productsCollection.add(prodObj);
    }
  }

  private uploadImg(prod: ProductI, image: FileI ): any {
    this.filePath = `products/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const tack = this.storage.upload(this.filePath, image);
    tack.snapshotChanges()
      .pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.downloadURL = urlImage;
            this.saveProduct(prod);
          });
        })
      ).subscribe();
  }
}
