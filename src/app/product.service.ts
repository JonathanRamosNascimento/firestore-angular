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
    return this.productsCollection.add(p);
  }
}
