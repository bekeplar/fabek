import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from './products.model';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/products/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    this.http
      .get<{ message: string; products: any; }>(
        BACKEND_URL
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                name: product.name,
                description: product.description,
                id: product._id,
                price: product.price,
                imagePath: product.imagePath,
                creator: product.creator
              };
            }),
          };
        })
      )
      .subscribe(transformedProductData => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products]
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      price: string,
      description: string;
      imagePath: string;
      // creator: string;
    }>(BACKEND_URL + id);
  }

  addProduct(name: string, description: string, image: File) {
    const productData = new FormData();
    productData.append('name', name);
    productData.append('description', description);
    productData.append('image', image);
    this.http
      .post<{ message: string; post: Product }>(
        BACKEND_URL,
        productData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateProduct(id: string, name: string, price: string, description: string, image: File | string) {
    let productData: Product | FormData;
    if (typeof image === 'object') {
      productData = new FormData();
      productData.append('id', id);
      productData.append('name', name);
      productData.append('price', price);
      productData.append('description', description);
      productData.append('image', image);
    } else {
      productData = {
        id,
        name,
        price,
        description,
        imagePath: image
      };
    }
    this.http
      .put(BACKEND_URL + id, productData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete(BACKEND_URL + productId);
  }
}
