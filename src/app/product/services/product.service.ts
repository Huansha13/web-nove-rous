import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, map} from 'rxjs/operators';
// @ts-ignore
import { Products } from './../models/product.interface';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Observable<Products[]>;

  private productsCollection: AngularFirestoreCollection<Products>;

  constructor(
    private readonly afs: AngularFirestore ) {
    this.productsCollection = afs.collection<Products>('products');
    this.getProducts();
  }

  onDeleteProduts(prodId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.productsCollection.doc(prodId).delete();
        resolve(result);
      }catch (err) {
        reject(err.message);
      }
    });
  }
  onSaveProducts(products: Products, prodId: string): Promise<void>{
    return new Promise(async (resolve, rejects) => {
      try {
        const id = prodId || this.afs.createId();
        const data  = {id, ... products};
        const result = this.productsCollection.doc(id).set(data);
        resolve(result);
      }catch ( err) {
        rejects(err.message);
      }
    });
  }

  private getProducts(): Observable<Products[]> {
    return this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Products))
    );
  }
}
