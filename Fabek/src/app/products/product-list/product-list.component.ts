import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  isLoading = false;
  totalProducts = 0;
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts();
    this.userId = this.authService.getUserId();
    this.productsSub = this.productsService
      .getProductUpdateListener()
      .subscribe((productData: { products: Product[]; }) => {
        this.isLoading = false;
        this.products = productData.products;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }


  onDelete(productId: string) {
    this.isLoading = true;
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.productsService.getProducts();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
