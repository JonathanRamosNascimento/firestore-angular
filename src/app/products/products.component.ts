import { Product } from './../models/product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  displayedColumns = ['name', 'price', 'stock', 'operations'];

  productForm = this.fb.group({
    id: [undefined],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required]],
    price: [0, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  onSubmit() {
    let p: Product = this.productForm.value;

    if (!p.id) {
      this.addProduct(p);
    } else {
      this.editProduct(p);
    }
  }

  addProduct(p: Product) {
    this.productService.addProduct(p)
      .then(() => {
        this.snackBar.open('Product added.', 'OK', {duration: 2000});
      })
      .catch(() => {
        this.snackBar.open('Error on submit the product.', 'OK', {duration: 2000});
      })
  }

  editProduct(p: Product) {

  }
}
