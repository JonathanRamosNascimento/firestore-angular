import { Product } from './../models/product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  filterProducts$: Observable<Product[]>;
  displayedColumns = ['name', 'price', 'stock', 'operations'];

  @ViewChild('name', { static: true }) productName: ElementRef;

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
      this.updateProduct(p);
    }
  }

  addProduct(p: Product) {
    this.productService.addProduct(p)
      .then(() => {
        this.snackBar.open('Product added.', 'OK', { duration: 2000 });
        this.productForm.reset({ name: '', stock: 0, price: 0, id: undefined });
        this.productName.nativeElement.focus();
      })
      .catch(() => {
        this.snackBar.open('Error on submit the product.', 'OK', { duration: 2000 });
      })
  }

  updateProduct(p: Product) {
    this.productService.updateProduct(p)
      .then(() => {
        this.snackBar.open('Product updated!', 'OK', { duration: 2000 });
        this.productForm.reset({ name: '', stock: 0, price: 0, id: undefined });
        this.productName.nativeElement.focus();
      })
      .catch((e) => {
        console.error(e);
        this.snackBar.open('Error updating the product.', 'OK', { duration: 2000 });
      })
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  del(p: Product) {
    this.productService.deleteProduct(p)
      .then(() => {
        this.snackBar.open('Product has been removed.', 'OK', { duration: 2000 });
      })
      .catch((e) => {
        console.error(e);
        this.snackBar.open('Error when trying to remove the product.', 'OK', { duration: 2000 });
      })
  }

  filter(event) {
    this.filterProducts$ = this.productService.searchByName(event.target.value);
  }
}
