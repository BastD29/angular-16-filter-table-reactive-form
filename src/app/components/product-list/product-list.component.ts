import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  searchForm!: FormGroup;
  filteredProducts$!: Observable<Product[]>;
  categories!: string[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      category: ['All'],
    });

    this.filteredProducts$ = this.productService.getFilteredProducts();
    this.categories = this.productService.getCategories();

    // Subscribe to category changes and filter products
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProducts();
    });
  }

  filterProducts() {
    const { category } = this.searchForm.value;
    this.productService.filterProducts(category);
  }
}
