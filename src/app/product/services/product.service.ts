import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, map} from 'rxjs/operators';
// @ts-ignore
import { Products } from '../models/product.interface';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileI} from '../models/file.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Products>;
  private filePath: any;
  private downloadURL: Observable<string>;
  uploadPercent$: Observable<number>;

  constructor( private afs: AngularFirestore,
               private storage: AngularFireStorage ) {
    this.productsCollection = afs.collection<Products>('products');
  }
  public getAllProduct(): Observable<Products[]> {
    return this.productsCollection
      .snapshotChanges()
      .pipe(
        map(action => action.map(a => {
          const data = a.payload.doc.data() as Products;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  public getOneProduct(id: Products): Observable<Products> {
    return this.afs.doc<Products>(`list/${id}`).valueChanges();
  }
  // tslint:disable-next-line:typedef
  public onDeleteProduts(product: Products) {
    return this.productsCollection.doc(product.id).delete();
  }

  public editPostById(product: Products, newImage?: FileI): Promise<void> {
    if (newImage) {
      this.uploadImg(product, newImage);
    } else {
      return this.productsCollection.doc(product.id).update(product);
    }
  }
  public preAdd(product: Products, image: FileI): void {
    this.uploadImg(product, image);
  }
  // tslint:disable-next-line:typedef
  private saveProduct(product: Products) {
    const productObj = {
      name: product.name,
      description: product.description,
      img: this.downloadURL,
      fileRef: this.filePath,
      price: product.price,
      total: product.total,
      vendidos: product.vendidos
    };
    if (product.id) {
      return this.productsCollection.doc(product.id).update(productObj).then( () => {
        console.log('Info actualizado');
      }).catch(( err ) =>  console.log('error al actualizar', err));
    } else  {
      this.productsCollection.add(productObj).then(
        () => console.log('Se agrego nuevo producto')
      ).catch( err => console.log('Error', err));
    }
  }

  private uploadImg(product: Products, image: FileI ): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const tack = this.storage.upload(this.filePath, image);
    this.uploadPercent$ = tack.percentageChanges();
    tack.snapshotChanges()
      .pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.downloadURL = urlImage;
            this.saveProduct(product);
          });
        })
      ).subscribe();
  }
}
