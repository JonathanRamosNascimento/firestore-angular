import { Product } from './models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product> = this.afs.collection('products')

  constructor(
    private afs: AngularFirestore
  ) { }

  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  addProduct(p: Product) {
    p.id = this.afs.createId();
    return this.productsCollection.doc(p.id).set(p);
    // return this.productsCollection.add(p);
  }

  deleteProduct(p: Product) {
    return this.productsCollection.doc(p.id).delete();
  }

  updateProduct(p: Product) {
    return this.productsCollection.doc(p.id).set(p);
  }
}
